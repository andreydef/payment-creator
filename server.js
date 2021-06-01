const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const cookieSession = require("cookie-session")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require("./models/User.js")

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["somesecretsauce"]
  })
)

const db = require("./config/keys").mongoURI
mongoose
  .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err))

app.use(passport.initialize())
app.use(passport.session())

require("./config/passport")
require("./routes/auth.js")(app)

const port = process.env.PORT || 5000

app.listen(port, () =>
    console.log(`Server start on http://localhost:${port}`))
