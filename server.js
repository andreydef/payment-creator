const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const cookieSession = require("cookie-session")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require("./models/User")
require("./models/Pay")
require("./models/Subscriptions")
require("./models/Orders")

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
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err))

app.use(passport.initialize())
app.use(passport.session())

require("./config/passport")
require("./routes/auth")(app)
require("./routes/product")(app)
require("./routes/payment")(app)
require("./routes/orders")(app)

const port = process.env.PORT || 5000

app.listen(port, () =>
    console.log(`Server start on http://localhost:${port}`))
