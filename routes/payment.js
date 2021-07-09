const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const keys = require("../config/keys")

const createPay = require('../models/Pay')
const createSubscribe = require('../models/Subscriptions')

const db = require('../config/database')

const stripe = require('stripe')('sk_test_51IzoTdK5elvk04pSqGoMAGLAtpleSjLYmdTbmNSxu44PTJ6TPLvOjj8SRdmiUyRvWciA4CTxHlH8mA2ViGNJF55t00k4HCCwis');

module.exports = app => {
    app.get("/api/subscribe/cancel", async (req, res) => {
        if (req.cookies['auth_token']) {
            // const user = await jwt.verify(req.cookies['auth_token'], `${keys.JWT_SECRET}`, function(err, decoded) {
            //     if (err) {
            //         return res.status(500).send({
            //             message: err.message
            //         })
            //     } else {
            //         return decoded
            //     }
            // })

            // const ordersDoc = await orders.findOne({
            //     user: user
            // });

            // if (ordersDoc) res.json(ordersDoc);
            // else res.status(404).json({ message: "Order not found" });
        } else {
            res.sendStatus(403)
        }
    })

    app.post("/api/pay", async (req, res) => {
        const { email, amount, payment_method } = req.body

        if (req.cookies['auth_token']) {
            // const user = await jwt.verify(req.cookies['auth_token'], `${keys.JWT_SECRET}`, function(err, decoded) {
            //     if (err) {
            //         return res.status(500).send({
            //             message: err.message
            //         })
            //     } else {
            //         return decoded
            //     }
            // })

            await createPay()
            if (req.body.type === 'paypal') {
                const { email_address } = req.body.payer

                await db.query(
                    'INSERT INTO pay (' +
                    'id, status, amount, email,' +
                    'type, createdAt)' +
                    'VALUES ($1, $2, $3, $4, $5, $6)',
                    [
                        req.body.orderID,
                        'Active',
                        amount,
                        email_address,
                        req.body.type,
                        Date.now()
                    ]
                )


                // new pay({
                //     id: req.body.orderID,
                //     user: user,
                //     payer: req.body.payer,
                //     products: req.body.product,
                //     type: req.body.type,
                //     createdAt: Date.now()
                // }).save()
                //     .then((order) => {
                //         done(null, order)
                //     })
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

                await db.query(
                    'INSERT INTO pay (' +
                    'id, status, amount, email,' +
                    'type, createdAt)' +
                    'VALUES ($1, $2, $3, $4, $5, $6)',
                    [
                        req.body.payment_method,
                        'Active',
                        amount,
                        paymentIntent.receipt_email,
                        req.body.type,
                        Date.now()
                    ]
                )

                res.send({ client_secret: paymentIntent.client_secret })

                // new pay({
                //     id: req.body.payment_method,
                //     user: user,
                //     amount: amount,
                //     email: paymentIntent.receipt_email,
                //     currency: paymentIntent.currency,
                //     products: req.body.product,
                //     type: req.body.type,
                //     createdAt: Date.now()
                // }).save()
                //     .then((order) => {
                //         done(null, order)
                //     })
            }
        } else {
            res.sendStatus(403)
        }
    })

    app.post("/api/subscribe", async (req, res) => {
        const { user_email, payment_method } = req.body
        // const user = await jwt.verify(req.cookies['auth_token'], `${keys.JWT_SECRET}`, function(err, decoded) {
        //     if (err) {
        //         return res.status(500).send({
        //             message: err.message
        //         })
        //     } else {
        //         return decoded
        //     }
        // })

        await createSubscribe()
        if (req.body.type === 'paypal') {
            await db.query(
                'INSERT INTO subscribe (' +
                'id, subscriptionID, email,' +
                'type, createdAt)' +
                'VALUES ($1, $2, $3, $4, $5)',
                [
                    req.body.orderID,
                    req.body.subscriptionID,
                    user_email,
                    req.body.type,
                    Date.now()
                ]
            )

            // new subscriptions({
            //     id: req.body.orderID,
            //     subscriptionID: req.body.subscriptionID,
            //     user: user,
            //     products: req.body.product,
            //     type: req.body.type,
            //     createdAt: Date.now()
            // }).save()
            //     .then((order) => {
            //         done(null, order)
            //     })
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

            await db.query(
                'INSERT INTO subscribe (' +
                'id, subscriptionID, customer, email,' +
                'type, createdAt)' +
                'VALUES ($1, $2, $3, $4, $5, $6)',
                [
                    req.body.payment_method,
                    subscription.id,
                    subscription.customer,
                    user_email,
                    req.body.type,
                    Date.now()
                ]
            )

            // new subscriptions({
            //     id: req.body.payment_method,
            //     subscriptionID: subscription.id,
            //     user: user,
            //     customer: subscription.customer,
            //     products: req.body.product,
            //     type: req.body.type,
            //     createdAt: Date.now()
            // }).save()
            //     .then((order) => {
            //         done(null, order)
            //     })

            // new orders({
            //     paymentID: req.body.paymentID,
            //     subscriptionID: subscription.id,
            //     product: {
            //         productID: req.body.product._id,
            //         productName: req.body.product.name,
            //         productBrand: req.body.product.brand,
            //         productCategory: req.body.product.category,
            //         price: req.body.product.price,
            //         payment_type: req.body.product.payment_type
            //     },
            //     id_user: user.id,
            //     paymentType: req.body.paymentType,
            //     status: req.body.status,
            //     paymentAmount: req.body.product.price,
            //     createdAt: Date.now()
            // }).save()
            //     .then((order) => {
            //         done(null, order)
            //     })
        }
    })

    app.delete("/api/stripe-subscribe/:id", async (req, res) => {
        if (req.cookies['auth_token']) {
            const user = await jwt.verify(req.cookies['auth_token'], `${keys.JWT_SECRET}`, function(err, decoded) {
                if (err) {
                    return res.status(500).send({
                        message: err.message
                    })
                } else {
                    return decoded
                }
            })

            if (!!req.params.id)
            {
                // orders.findOne({ paymentID: req.params.id }, async (err, data) => {
                //     if (err) {
                //         res.status(403).send({ message: err })
                //     } else {
                //         if (JSON.stringify(user.id) === JSON.stringify(data.id_user))
                //         {
                //             try {
                //                 await stripe.subscriptions.update(data.subscriptionID, {
                //                     cancel_at_period_end: true
                //                 })
                //
                //                 orders.updateOne({ paymentID: req.params.id }, {
                //                     $set: { status: 'Cancel subscription' }
                //                 }, (err,) => {
                //                     if (err) {
                //                         console.log(err)
                //                     }
                //                 })
                //
                //                 orders.find({
                //                     paymentID: req.params.id
                //                 }, (err, data) =>{
                //                     if (err) {
                //                         console.log(err)
                //                     } else {
                //                         res.json(data);
                //                     }
                //                 });
                //             } catch (err) {
                //                 console.log(err)
                //                 res.status(422).json({ message: 'The subscription has already been deleted or is not active' })
                //             }
                //         } else {
                //             console.log('Users dont match!')
                //             res.status(403).json({ message: 'Users dont match!' })
                //         }
                //     }
                // })
            } else {
                res.status(404).send({ message: 'PaymentID not found!' })
            }
        } else {
            res.sendStatus(403)
        }
    })

    app.delete("/api/paypal-subscribe/:id", async (req, res) => {
        if (req.cookies['auth_token']) {
            // const user = await jwt.verify(req.cookies['auth_token'], `${keys.JWT_SECRET}`, function(err, decoded) {
            //     if (err) {
            //         return res.status(500).send({
            //             message: err.message
            //         })
            //     } else {
            //         return decoded
            //     }
            // })

            // orders.updateOne({ paymentID: req.params.id }, {
            //     $set: { status: 'Cancel subscription' }
            // }, (err,) => {
            //     if (err) {
            //         console.log(err)
            //     }
            // })
            //
            // orders.find({
            //     user: user
            // }, (err, data) =>{
            //     if (err) {
            //         console.log(err)
            //     } else {
            //         res.json(data);
            //     }
            // });
        } else {
            res.sendStatus(403)
        }
    })
}
