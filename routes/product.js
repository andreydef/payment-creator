const asyncHandler = require("express-async-handler")
// const Product = require("../models/Product")

const db = require('../config/database')

module.exports = app => {
    app.get("/api/products",
        asyncHandler(async (req, res) => {
            if (req.cookies['auth_token']) {
                const { rows } = await db.query('SELECT * FROM products')

                res.json(rows)
            } else {
                res.sendStatus(403)
            }
        })
    )

    app.get("/api/products/:id",
        asyncHandler(async (req, res) => {
            if (req.cookies['auth_token']) {
                const { rows } = await db.query('SELECT * FROM products ' +
                    'WHERE id = $1', [req.params.id], (err, doc) => {
                    if (err) {
                        console.log(err)
                    } else {
                        return { ...doc }
                    }
                })

                if (rows) res.json(rows)
                else res.status(404).json({ message: "Product not found" })
            } else {
                res.sendStatus(403)
            }
        })
    )
}
