const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
const keys = require("../config/keys")

const db = require('../config/database')
const createOrder = require('../models/Orders')

module.exports = app => {
    app.post("/api/create-order", async (req, res, done) => {
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

            await createOrder()
            await db.query(
                'INSERT INTO orders (' +
                'paymentID, subscriptionID, id_user, ' +
                'paymentType, status,' +
                'paymentAmount, createdAt)' +
                'VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [
                    req.body.paymentID,
                    req.body.subscriptionID,
                    user.id,
                    req.body.paymentType,
                    req.body.status,
                    req.body.product.price,
                    Date.now(),
                ]
            )

            // new orders({
            //     paymentID: req.body.paymentID,
            //     subscriptionID: req.body.subscriptionID,
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
        } else {
            res.sendStatus(403)
        }
    })

    app.get("/api/orders",
        asyncHandler(async (req, res) => {
            if (req.cookies['auth_token']) {
                const user = await jwt.verify(req.cookies['auth_token'], `${keys.JWT_SECRET}`,
                    function(err, decoded) {
                    if (err) {
                        return res.status(500).send({
                            message: err.message
                        })
                    } else {
                        return decoded
                    }
                })

                // orders.find({
                //     id_user: user.id
                // }, (err, data) =>{
                //     if (err) {
                //         console.log(err)
                //     } else {
                //         UserModel.updateOne({ id_user: user.id }, {
                //             $set: { orders: data }
                //         }, (err,) => {
                //             if (err) {
                //                 console.log(err)
                //             }
                //         })
                //         res.json(data)
                //     }
                // })
            } else {
                res.sendStatus(403)
            }
        })
    )
}
