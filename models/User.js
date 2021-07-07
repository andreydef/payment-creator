const db = require('../config/database')

module.exports = createUser = async () => {
  await db.query(
      'CREATE TABLE IF NOT EXISTS users (' +
      'id VARCHAR(50) PRIMARY KEY,' +
      'email VARCHAR(50) NOT NULL,' +
      'verified_email BOOLEAN NOT NULL,' +
      'name VARCHAR(50) NOT NULL,' +
      'given_name VARCHAR(50) NOT NULL,' +
      'family_name VARCHAR(50) NOT NULL, ' +
      'picture VARCHAR(150),' +
      'locale VARCHAR(5) NOT NULL,' +
      'orders VARCHAR(150) ARRAY' +
      ')'
  )
}
