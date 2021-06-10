const mongoose = require("mongoose")
const paypal = mongoose.model("payPalPay")
const payPalSubscribe = mongoose.model("payPalSubscribe")
const Product = require("../models/Product")

module.exports = app => {
    app.post("/api/paypal-pay", async (req, res, done) => {
        await Product.findOneAndUpdate({ name: req.body.productName },
            { status: 'Pay PayPal' }, { upsert: true, useFindAndModify: false })
            .exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                res.send(result)
            })

        new paypal({
            orderID: req.body.orderID,
            user: req.user,
            status: req.body.status,
            payer: req.body.payer
        }).save()
            .then((order) => {
                done(null, order)
            })
         }
    )

    app.post("/api/paypal-subscribe", async (req, res, done) => {
        new payPalSubscribe({
            orderID: req.body.orderID,
            subscriptionID: req.body.subscriptionID,
            user: req.user
        }).save()
            .then((order) => {
               done(null, order)
            })
        }
    )
}

