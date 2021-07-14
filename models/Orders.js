const db = require('../config/database')

module.exports = createOrder = async () => {
    await db.query(
        'CREATE TABLE IF NOT EXISTS orders (' +
        'paymentID VARCHAR(100) PRIMARY KEY,' +
        'subscriptionID VARCHAR(100),' +
        'id_user VARCHAR(100) NOT NULL,' +
        'paymentType VARCHAR(100) NOT NULL,' +
        'status VARCHAR(100),' +
        'paymentAmount DECIMAL NOT NULL, ' +
        'products VARCHAR(150) ARRAY,' +
        'createdAt VARCHAR(50) NOT NULL' +
        ')'
    )
}

// const ordersSchema = mongoose.Schema(
//     {
//         product: {
//             productID: {
//                 type: String,
//                 required: true
//             },
//             productName: {
//                 type: String,
//                 required: true
//             },
//             productBrand: {
//                 type: String,
//                 required: true,
//             },
//             productCategory: {
//                 type: String,
//                 required: true,
//             },
//             price: {
//                 type: Number,
//                 required: true,
//                 default: 0
//             },
//         },
//     },
//     { timestamps: true }
// )
