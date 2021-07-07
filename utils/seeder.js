// const mongoose = require("mongoose")
//const format = require('pg-format');

const products = require("../data/products")

const db = require('../config/database')
const importProduct = require('../models/Product')

const importData = async () => {
    try {

        const sampleProducts = products.map((product) => {
            return { ...product }
        })
        // console.log(sampleProducts)

        let product
        for (const key of sampleProducts.keys()) {
            product = sampleProducts[key]
        }
        console.log(product)

        await importProduct()
        await db.query(
            'INSERT INTO products (' +
            'name, image, brand, category,' +
            'description, price, status, payment_type)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                product.name,
                product.image,
                product.brand,
                product.category,
                product.description,
                product.price,
                product.status,
                product.payment_type,
            ]
        )

        // await Product.insertMany(sampleProducts);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        // await Product.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
