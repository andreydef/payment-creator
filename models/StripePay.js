const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StripePayPaySchema = new Schema({
    token: {
        type: Object,
        required: true,
    },
    user: [{
        type: Object,
        required: true,
        ref: 'users'
    }],
    info: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = stripePay = mongoose.model("stripePay", StripePayPaySchema)
