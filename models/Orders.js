const db = require('../config/database')

module.exports = createOrder = async () => {
    await db.query(
        'CREATE TABLE IF NOT EXISTS orders (' +
        'paymentID VARCHAR(50) PRIMARY KEY,' +
        'subscriptionID VARCHAR(50) NOT NULL,' +
        'id_user VARCHAR(50) NOT NULL,' +
        'paymentType VARCHAR(50) NOT NULL,' +
        'status VARCHAR(50) NOT NULL,' +
        'paymentAmount INTEGER NOT NULL, ' +
        'products VARCHAR(150) ARRAY,' +
        'createdAt VARCHAR(50)' +
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
