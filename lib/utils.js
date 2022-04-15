const db = require('../database/connect')

function query(qs, next) {
    db.getConnection((err, connection) => {
        connection.query(qs, (err, results) => {
            if (err) throw err

            results = JSON.parse(JSON.stringify(results))

            connection.release()
            
            if (typeof next === 'function') next(results)
        })
    })
}

module.exports = { query }