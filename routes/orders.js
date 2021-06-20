const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")

const User = mongoose.model("users")
const orders = mongoose.model("Orders")

module.exports = app => {
    app.post("/api/create-order", async (req, res, done) => {
        if (req.isAuthenticated()) {
            new orders({
                paymentID: req.body.paymentID,
                subscriptionID: req.body.subscriptionID,
                product: {
                    productID: req.body.product._id,
                    productName: req.body.product.name,
                    productBrand: req.body.product.brand,
                    productCategory: req.body.product.category,
                    price: req.body.product.price,
                    payment_type: req.body.product.payment_type
                },
                user: req.user,
                paymentType: req.body.paymentType,
                status: req.body.status,
                paymentAmount: req.body.product.price,
                createdAt: Date.now()
            }).save()
                .then((order) => {
                    done(null, order)
                })
        } else {
            res.sendStatus(403)
        }
    })

    app.get("/api/orders",
        asyncHandler(async (req, res) => {
            if (req.isAuthenticated()) {
                orders.find({
                    user: mongoose.Types.ObjectId(req.user.id)
                }, (err, data) =>{
                    if (err) {
                        console.log(err)
                    } else {
                        User.updateOne({ email: req.user.email }, {
                            $set: { orders: data }
                        }, (err,) => {
                            if (err) {
                                console.log(err)
                            }
                        })

                        res.json(data);
                    }
                });
            } else {
                res.sendStatus(403)
            }
        })
    )

    app.get("/api/orders/:id", async (req, res) => {
        if (req.isAuthenticated()) {
            const orders = await orders.findOne({
                user: mongoose.Types.ObjectId(req.params.id)
            });

            if (orders) res.json(orders);
            else res.status(404).json({ message: "Order not found" });
        } else {
            res.sendStatus(403)
        }
    })
}
