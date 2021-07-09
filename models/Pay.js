const db = require('../config/database')

module.exports = createPay = async () => {
    await db.query(
        'CREATE TABLE IF NOT EXISTS pay (' +
        'id VARCHAR(50) PRIMARY KEY NOT NULL,' +
        'status VARCHAR(50) NOT NULL,' +
        'amount REAL,' +
        'email VARCHAR(50),' +
        'type VARCHAR(50) NOT NULL,' +
        'createdAt VARCHAR(50) NOT NULL' +
        ')'
    )
}

// const PaySchema = new Schema({
//     // user: [{
//     //     type: Object,
//     //     required: true,
//     //     ref: 'users'
//     // }],
//     // payer: {
//     //     type: Object,
//     //     required: false
//     // },
//     // products: [{
//     //     type: Object,
//     //     required: true
//     // }],
// })
