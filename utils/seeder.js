const mongoose = require("mongoose")
const format = require('pg-format');

const products = require("../data/products")
const Product = require("../models/Product")

const db = require('../config/database')

// const db = require("../config/keys").mongoURI
// mongoose
//     .connect(db, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log("MongoDB connected successfully!"))
//     .catch(err => console.log(err))


const importData = async () => {
    try {
        // const sampleProducts = products.map((product) => {
        //     return { ...product };
        // });

        // await db.query(
        //     'CREATE TABLE IF NOT EXISTS users (' +
        //     'id SERIAL PRIMARY KEY,' +
        //     'name VARCHAR(50) NOT NULL,' +
        //     'email VARCHAR(50) NOT NULL,' +
        //     'photo VARCHAR(150) NOT NULL,' +
        //     'orders TEXT[]' +
        //     ')'
        // )

        const sampleProducts = products.map((product) => {
            return { ...product }
        })


        // await db.query(
        //     'INSERT INTO users (name, email, photo)' +
        //     'VALUES ($1)', [sampleProducts]
        // )


        // await db.query(
        //     'INSERT INTO products (product_name, quantity, price)' +
        //     'VALUES ($1, $2, $3)', [product_name, quantity, price]
        // )

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
