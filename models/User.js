const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id_user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
  },
  orders: [{
    type: Object,
    required: true,
    default: [],
    ref: 'orders'
  }]
})

module.exports = User = mongoose.model("users", UserSchema)
