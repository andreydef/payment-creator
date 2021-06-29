const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
const keys = require("../config/keys")

const User = mongoose.model("users")
const orders = mongoose.model("Orders")

module.exports = app => {
    app.post("/api/create-order", async (req, res, done) => {
        if (req.cookies['auth_token']) {
            const user = jwt.verify(req.cookies['auth_token'], `${keys.JWT_SECRET}`)

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
                user: user,
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
            if (req.cookies['auth_token']) {
                const user = jwt.verify(req.cookies['auth_token'], `${keys.JWT_SECRET}`);

                orders.find({
                    user: user
                }, (err, data) =>{
                    if (err) {
                        console.log(err)
                    } else {
                        User.updateOne({ email: user.email }, {
                            $set: { orders: data }
                        }, (err,) => {
                            if (err) {
                                console.log(err)
                            }
                        })

                        res.json(data);
                    }
                })
            } else {
                res.sendStatus(403)
            }
        })
    )

    app.get("/api/orders/:id", async (req, res) => {
        if (req.cookies['auth_token']) {
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
