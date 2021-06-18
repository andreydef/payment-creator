const mongoose = require("mongoose")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("../config/keys.js")

const User = mongoose.model("users")
const Orders = mongoose.model("Orders")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
      (accessToken, refreshToken, profile, done) => {

      User.findOne({ email: profile.emails[0].value }).then(  async existingUser => {
        if (existingUser) {
          const orders = await Orders.find({
              user: mongoose.Types.ObjectId(existingUser._id)
          }, (err, data) =>{
             if (err) {
               console.log(err)
             } else {
                return data
             }
          });

          User.updateOne({ email: profile.emails[0].value }, {
              $set: { orders: orders }
          }, (err,) => {
              if (err) {
                  console.log(err)
              }
          })

          done(null, existingUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value.split("?")[0],
            orders: []
          })
            .save()
            .then(user => done(null, user));
        }
      })
    }
  )
)
