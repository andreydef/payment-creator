const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SubscriptionsSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    subscriptionID: {
        type: String,
        required: true
    },
    // user: [{
    //     type: Object,
    //     required: true,
    //     ref: 'users'
    // }],
    customer: {
        type: String,
        required: false,
    },
    products: [{
        type: Object,
        required: true
    }],
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

module.exports = Subscriptions = mongoose.model("Subscriptions", SubscriptionsSchema)
