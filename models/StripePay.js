const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StripePayPaySchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    user: [{
        type: Object,
        required: true,
        ref: 'users'
    }],
    amount: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

module.exports = stripePay = mongoose.model("stripePay", StripePayPaySchema)
