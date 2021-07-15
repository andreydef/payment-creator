const db = require('../config/database')

module.exports = importProduct = async () => {
    await db.query(
        'CREATE TABLE IF NOT EXISTS products (' +
        'id SERIAL PRIMARY KEY NOT NULL,' +
        'name VARCHAR(50) NOT NULL,' +
        'image VARCHAR(50) NOT NULL,' +
        'brand VARCHAR(50) NOT NULL,' +
        'category VARCHAR(50) NOT NULL,' +
        'description VARCHAR(300) NOT NULL,' +
        'price REAL NOT NULL,' +
        'status VARCHAR(50) NOT NULL,' +
        'payment_type VARCHAR(50)' +
        ')'
    )
}
