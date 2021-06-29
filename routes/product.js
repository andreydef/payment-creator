const asyncHandler = require("express-async-handler")
const Product = require("../models/Product")

module.exports = app => {
    app.get("/api/products",
        asyncHandler(async (req, res) => {
            if (req.cookies['auth_token']) {
                const products = await Product.find({});

                res.json(products);
            } else {
                res.sendStatus(403)
            }
        })
    )

    app.get("/api/products/:id",
        asyncHandler(async (req, res) => {
            if (req.cookies['auth_token']) {
                const product = await Product.findById(req.params.id);

                if (product) res.json(product);
                else res.status(404).json({ message: "Product not found" });
            } else {
                res.sendStatus(403)
            }
        })
    )
}
