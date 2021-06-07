const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PayPalPaySchema = new Schema({
    orderID: {
        type: String,
        required: true,
    },
    user: [{
        type: Object,
        required: true,
        ref: 'users'
    }],
    status: {
        type: String,
        required: true
    },
    payer: {
        type: Object,
        required: true
    }
})

module.exports = payPalPay = mongoose.model("payPalPay", PayPalPaySchema)
