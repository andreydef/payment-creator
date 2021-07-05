const { Pool } = require('pg')

const connect_string = require("../config/keys").postgreURI

const pool = new Pool({
    connectionString: connect_string
})

pool.on('connect', () => {
    console.log('Database is already connected')
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}