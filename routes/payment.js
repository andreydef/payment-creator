const mongoose = require("mongoose")
const pay = mongoose.model("Pay")
const subscriptions = mongoose.model("Subscriptions")

const stripe = require('stripe')('sk_test_51IzoTdK5elvk04pSqGoMAGLAtpleSjLYmdTbmNSxu44PTJ6TPLvOjj8SRdmiUyRvWciA4CTxHlH8mA2ViGNJF55t00k4HCCwis');

module.exports = app => {
    app.post("/api/pay", async (req, res, done) => {
        const { email, amount, payment_method } = req.body

        if (req.body.type === 'paypal') {
            new pay({
                id: req.body.orderID,
                user: req.user,
                status: req.body.status,
                payer: req.body.payer,
                products: req.body.product,
                type: req.body.type,
                createdAt: Date.now()
            }).save()
                .then((order) => {
                    done(null, order)
                })
        } else {
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

            new pay({
                id: req.body.payment_method,
                user: req.user,
                amount: amount,
                email: paymentIntent.receipt_email,
                currency: paymentIntent.currency,
                products: req.body.product,
                type: req.body.type,
                createdAt: Date.now()
            }).save()
                .then((order) => {
                    done(null, order)
                })
        }
    })

    app.post("/api/subscribe", async (req, res, done) => {
        const { user_email, payment_method } = req.body;

        if (req.body.type === 'paypal') {
            new subscriptions({
                id: req.body.orderID,
                subscriptionID: req.body.subscriptionID,
                user: req.user,
                products: req.body.product,
                type: req.body.type,
                createdAt: Date.now()
            }).save()
                .then((order) => {
                    done(null, order)
                })
        } else {
            const customer = await stripe.customers.create({
                payment_method: payment_method,
                email: user_email,
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

            new subscriptions({
                id: req.body.payment_method,
                subscriptionID: subscription.id,
                user: req.user,
                customer: subscription.customer,
                products: req.body.product,
                type: req.body.type,
                createdAt: Date.now()
            }).save()
                .then((order) => {
                    done(null, order)
                })
        }
    })
}
