const mongoose = require("mongoose")
const payPalPay = mongoose.model("payPalPay")

module.exports = app => {
    app.post("/api/paypal-pay",
        (req, res, done) => {
            new payPalPay({
                id: req.id
            }).save()
                .then((user) => {
                    console.log('done')
                    done(null, user)
                });
        }
    )
}

