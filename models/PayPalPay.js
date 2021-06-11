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
    },
    products: [{
        type: Object,
        required: true
    }],
    createdAt: {
        type: Date,
        required: true
    }
})

module.exports = payPalPay = mongoose.model("payPalPay", PayPalPaySchema)
