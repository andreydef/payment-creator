const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const keys = require("./config/keys")
const cors = require("cors")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

require("./models/User")
require("./models/Pay")
require("./models/Subscriptions")
require("./models/Orders")

app.use(cors({
    origin: keys.SERVER_ROOT_URI,
    credentials: true
}))

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["somesecretsauce"]
  })
)

const db = keys.mongoURI
mongoose
  .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err))

require("./routes/auth")(app)
require("./routes/product")(app)
require("./routes/payment")(app)
require("./routes/orders")(app)

const port = keys.PORT || 5000

app.listen(port, () =>
    console.log(`Server start on http://localhost:${port}`))
