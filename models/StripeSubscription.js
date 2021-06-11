const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StripeSubscriptionPaySchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    user: [{
        type: Object,
        required: true,
        ref: 'users'
    }],
    customer: {
        type: String,
        required: true,
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

module.exports = stripeSubscription = mongoose.model("stripeSubscription", StripeSubscriptionPaySchema)