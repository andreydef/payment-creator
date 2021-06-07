const mongoose = require("mongoose")
const paypal = mongoose.model("payPalPay")
const payPalSubscribe = mongoose.model("payPalSubscribe")

module.exports = app => {
    app.post("/api/paypal-pay", (req, res, done) => {
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

    app.post("/api/paypal-subscribe", (req, res, done) => {
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

