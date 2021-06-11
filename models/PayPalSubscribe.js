const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PayPalSubscribeSchema = new Schema({
    orderID: {
        type: String,
        required: true,
    },
    subscriptionID: {
        type: String,
        required: true
    },
    user: [{
        type: Object,
        required: true,
        ref: 'users'
    }],
    products: [{
        type: Object,
        required: true
    }]
})

module.exports = payPalPay = mongoose.model("payPalSubscribe", PayPalSubscribeSchema)
