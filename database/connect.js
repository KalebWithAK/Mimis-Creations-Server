const mysql = require('mysql')

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Python-3',
    database: 'mimis_creations'
})

module.exports = db