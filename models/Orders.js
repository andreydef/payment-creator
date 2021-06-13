const mongoose = require("mongoose")

const ordersSchema = mongoose.Schema(
    {
        paymentID: {
          type: String,
          required: true
        },
        product: {
            productName: {
                type: String,
                required: true
            },
            productBrand: {
                type: String,
                required: true,
            },
            productCategory: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
                default: 0
            },
        },
        user: [{
            type: Object,
            required: true,
            ref: 'users'
        }],
        paymentType: {
            type: String,
            required: true
        },
        paymentAmount: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = Orders = mongoose.model("Orders", ordersSchema)