const mongoose = require("mongoose")
const stripePay = mongoose.model("stripePay")

const stripe = require('stripe')('sk_test_51IzoTdK5elvk04pSqGoMAGLAtpleSjLYmdTbmNSxu44PTJ6TPLvOjj8SRdmiUyRvWciA4CTxHlH8mA2ViGNJF55t00k4HCCwis');

module.exports = app => {
    app.post("/api/stripe-pay", async (req, res, done) => {
        const { email } = req.body
        const { amount } = req.body

        let stringAmount = amount.toString()
        let numberAmount = parseFloat(stringAmount.replace('.', ''))

        const paymentIntent = await stripe.paymentIntents.create({
            amount: numberAmount,
            currency: 'usd',
            metadata: {integration_check: 'accept_a_payment'},
            receipt_email: email
        })

        console.log(paymentIntent)


        // new stripePay({
        //     token: req.body.token,
        //     user: req.user,
        //     info: req.body.info,
        //     amount: req.body.amount
        // }).save()
        //    .then((order) => {
        //        done(null, order)
        //    })
        }
    )

    app.post("/api/stripe-subscribe", async (req, res, done) => {

        const {email, payment_method} = req.body;

        const customer = await stripe.customers.create({
            payment_method: payment_method,
            email: email,
            invoice_settings: {
                default_payment_method: payment_method,
            },
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: 'price_1J03T6K5elvk04pSGOBGxuCA' }],
            expand: ['latest_invoice.payment_intent']
        });

        const status = subscription['latest_invoice']['payment_intent']['status']
        const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

        // res.json({'client_secret': client_secret, 'status': status});

        console.log(status)
        console.log(client_secret)
        console.log(subscription)
    })
}
