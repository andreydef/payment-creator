const mongoose = require("mongoose")
const stripePay = mongoose.model("stripePay")
const stripeSubscription = mongoose.model("stripeSubscription")

const stripe = require('stripe')('sk_test_51IzoTdK5elvk04pSqGoMAGLAtpleSjLYmdTbmNSxu44PTJ6TPLvOjj8SRdmiUyRvWciA4CTxHlH8mA2ViGNJF55t00k4HCCwis');

module.exports = app => {
    app.post("/api/stripe-pay", async (req, res, done) => {
        const { email, amount, payment_method } = req.body
        let stringAmount = amount.toString()
        let numberAmount = parseFloat(stringAmount.replace('.', ''))

        const customer = await stripe.customers.create({
            payment_method: payment_method,
            email: email,
            invoice_settings: {
                default_payment_method: payment_method
            },
        });

        const paymentIntent = await stripe.paymentIntents.create({
            customer: customer.id,
            payment_method: payment_method,
            amount: numberAmount,
            currency: 'usd',
            metadata: {integration_check: 'accept_a_payment'},
            receipt_email: email
        })

        await stripe.paymentIntents.confirm(
            paymentIntent.id,
            { payment_method: 'pm_card_visa' }
        )
        res.send({ client_secret: paymentIntent.client_secret })

        new stripePay({
            id: paymentIntent.id,
            user: req.user,
            amount: amount,
            email: paymentIntent.receipt_email,
            currency: paymentIntent.currency,
            products: req.body.product,
            createdAt: Date.now()
        }).save()
           .then((order) => {
               done(null, order)
           })
        }
    )

    app.post("/api/stripe-subscribe", async (req, res, done) => {
        const { email, payment_method } = req.body;

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

        res.send({
            client_secret: client_secret.client_secret,
            status: status
        })

        // console.log(subscription.id)

        new stripeSubscription({
            id: subscription.id,
            user: req.user,
            customer: subscription.customer,
            products: req.body.product,
            createdAt: Date.now()
        }).save()
            .then((order) => {
                done(null, order)
            })
    })
}
