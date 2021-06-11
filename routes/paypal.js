const mongoose = require("mongoose")
const paypal = mongoose.model("payPalPay")
const payPalSubscribe = mongoose.model("payPalSubscribe")

module.exports = app => {
    app.post("/api/paypal-pay", async (req, res, done) => {
        new paypal({
            orderID: req.body.orderID,
            user: req.user,
            status: req.body.status,
            payer: req.body.payer,
            products: req.body.product,
            createdAt: Date.now()
        }).save()
            .then((order) => {
                done(null, order)
                console.log('done paypal')
            })
         }
    )

    app.post("/api/paypal-subscribe", async (req, res, done) => {
        new payPalSubscribe({
            orderID: req.body.orderID,
            subscriptionID: req.body.subscriptionID,
            user: req.user,
            products: req.body.product
        }).save()
            .then((order) => {
               done(null, order)
            })
        }
    )
}

