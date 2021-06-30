const mongoose = require("mongoose")

const ordersSchema = mongoose.Schema(
    {
        paymentID: {
          type: String,
          required: true
        },
        subscriptionID: {
            type: String,
            required: false
        },
        product: {
            productID: {
                type: String,
                required: true
            },
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
        id_user: {
            type: String,
            required: true
        },
        paymentType: {
            type: String,
            required: true
        },
        status: {
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
