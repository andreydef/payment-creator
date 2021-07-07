const axios = require("axios")
const jwt = require('jsonwebtoken')

const { getGoogleAuthURL, getTokens } = require('../helpers/google-auth')
const createUser = require('../models/User')

const db = require('../config/database')
const keys = require("../config/keys")

const redirectUri = 'auth/google'

module.exports = app => {
  app.get('/', (req, res) => {
    res.redirect("/profile")
  })

  // Getting login url
  app.get("/auth/google/url", (req, res) => {
    return res.send(getGoogleAuthURL())
  })

  // Getting the user from Google
  app.get(`/${redirectUri}`, async (req, res) => {
    const code = req.query.code
    const { id_token, access_token } = await getTokens({
      code,
      clientId: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      redirectUri: `${keys.SERVER_ROOT_URI}/${redirectUri}`
    })

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          }
        }).then((res) => res.data)
        .catch((error) => {
          console.error(`Failed to fetch user`)
          throw new Error(error.message);
        })

    const token = jwt.sign(googleUser, `${keys.JWT_SECRET}`)
    res.cookie('auth_token', token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    })

    res.redirect(`${keys.CLIENT_ROOT_URI}/profile`)
  })

  // Getting the current user
  app.get("/api/current_user", async (req, res, done) => {
    try {
      if (req.cookies['auth_token'] === undefined) {
        return null
      } else {
        const user = await jwt.verify(req.cookies['auth_token'], `${keys.JWT_SECRET}`, function(err, decoded) {
          if (err) {
            return res.status(500).send({
              message: err.message
            })
          } else {
            return decoded
          }
        })

        await createUser()
        const { rows } = await db.query('SELECT * FROM users ' +
            'WHERE id = $1', [user.id], (err, doc) => {
          if (err) {
            console.log(err)
          } else {
            return { ...doc }
          }
        })

        let rowsToString = JSON.stringify(rows)
        if (rowsToString === '[]') {
          await db.query(
              'INSERT INTO users (' +
              'id, email, verified_email, ' +
              'name, given_name, ' +
              'family_name, picture, locale)' +
              'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
              [
                user.id,
                user.email,
                user.verified_email,
                user.name,
                user.given_name,
                user.family_name,
                user.picture,
                user.locale
              ]
          )
        }

        // User.findOne({ email: user.email }).then(  async existingUser => {
        //   if (existingUser) {
        //     const orders = await Orders.find({
        //       user: mongoose.Types.ObjectId(existingUser._id)
        //     }, (err, data) =>{
        //       if (err) {
        //         console.log(err)
        //       } else {
        //         return data
        //       }
        //     })
        //
        //     User.updateOne({ id_user: user.id }, {
        //       $set: { orders: orders }
        //     }, (err,) => {
        //       if (err) {
        //         console.log(err)
        //       }
        //     })
        //
        //     done(null, existingUser);
        //   } else {
        //     // new User({
        //     //   id_user: user.id,
        //     //   name: user.name,
        //     //   email: user.email,
        //     //   photo: user.picture,
        //     //   orders: []
        //     // }).save().then(user => done(null, user));
        //   }
        // })
        return res.send(user)
      }
    } catch (err) {
      console.log(err);
      res.send(null);
    }
  })

  app.get("/api/logout", (req, res) => {
    if (req.cookies['auth_token']) {
      res.clearCookie('auth_token');
      res.redirect("/login")
    } else {
      console.log('auth_token cookies not found')
      throw new Error('auth_token cookies not found');
    }
  })
}
