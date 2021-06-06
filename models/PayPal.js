const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PayPalPaySchema = new Schema({
    id: {
        type: Number,
        required: true,
    }
})

module.exports = payPalPay = mongoose.model("payPalPay", PayPalPaySchema)
