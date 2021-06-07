const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            required: true
        },
        payment_type: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = Products = mongoose.model("product", productSchema)

