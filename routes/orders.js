const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const orders = mongoose.model("Orders")
const Orders = require("../models/Orders")

module.exports = app => {
    app.post("/api/create-order", async (req, res, done) => {
        new orders({
           paymentID: req.body.paymentID,
           subscriptionID: req.body.subscriptionID,
           product: {
               productName: req.body.product.name,
               productBrand: req.body.product.brand,
               productCategory: req.body.product.category,
               price: req.body.product.price,
               payment_type: req.body.product.payment_type
           },
           user: req.user,
           paymentType: req.body.paymentType,
           paymentAmount: req.body.product.price,
           createdAt: Date.now()
        }).save()
           .then((order) => {
                done(null, order)
           })
        }
    )
    app.get("/api/orders",
        asyncHandler(async (req, res) => {
            const orders = await Orders.find({});
            res.json(orders);
        })
    )
    app.get("/api/orders/:id",
        asyncHandler(async (req, res) => {
            const orders = await Orders.findById(req.params.id);

            if (orders) res.json(orders);
            else res.status(404).json({ message: "Order not found" });
        })
    )
}
