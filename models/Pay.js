const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PaySchema = new Schema({
    id: {
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
        required: false
    },
    payer: {
        type: Object,
        required: false
    },
    amount: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    currency: {
        type: String,
        required: false
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

module.exports = Pay = mongoose.model("Pay", PaySchema)
