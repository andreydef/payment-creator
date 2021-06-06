const mongoose = require("mongoose")
const products = require("../data/products")

const Product = require("../models/Product")
const Order = require("../models/Order")

const db = require("../config/keys").mongoURI
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.log(err))


const importData = async () => {
    try {
        const sampleProducts = products.map((product) => {
            return { ...product };
        });
        await Product.insertMany(sampleProducts);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();

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
