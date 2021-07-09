const db = require('../config/database')

module.exports = createSubscribe = async () => {
    await db.query(
        'CREATE TABLE IF NOT EXISTS subscribe (' +
        'id VARCHAR(50) PRIMARY KEY NOT NULL,' +
        'subscriptionID VARCHAR(50),' +
        'customer VARCHAR(50),' +
        'email VARCHAR(50),' +
        'type VARCHAR(50) NOT NULL,' +
        'createdAt VARCHAR(50) NOT NULL' +
        ')'
    )
}


// const SubscriptionsSchema = new Schema({
//     // user: [{
//     //     type: Object,
//     //     required: true,
//     //     ref: 'users'
//     // }],
//     // products: [{
//     //     type: Object,
//     //     required: true
//     // }],
//     type: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         required: true
//     }
// })