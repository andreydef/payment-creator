// const mongoose = require("mongoose")
//const format = require('pg-format');

// const products = require("../data/products")

const db = require('../config/database')
const importProduct = require('../models/Product')

const importData = async () => {
    try {
        // const sampleProducts = products.map((product) => {
        //     return { ...product }
        // })
        //
        // let product
        // for (const key of sampleProducts.keys()) {
        //     product = sampleProducts[key]
        // }

        await importProduct()
        await db.query(
            'INSERT INTO products (' +
            'name, image, brand, category,' +
            'description, price, status, payment_type)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                'Airpods Wireless Bluetooth Headphones',
                '/images/airpods.jpg',
                'Apple',
                'Electronics',
                'Bluetooth technology lets you connect it with compatible devices wirelessly',
                5.99,
                'Active',
                'payment'
            ]
        )

        await db.query(
            'INSERT INTO products (' +
            'name, image, brand, category,' +
            'description, price, status, payment_type)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                'iPhone 11 Pro 256GB Memory',
                '/images/phone.jpg',
                'Apple',
                'Electronics',
                'Introducing the iPhone 11 Pro.',
                1.00,
                'Active',
                'subscription'
            ]
        )

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
