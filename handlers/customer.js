const bcrypt = require('bcrypt')
const { query } = require('../lib/utils')

// _customer

function register(name, email, password, street, city, state, zip, next) {
    if (name && /^\w*(\.|\-)?\w*@\w+\.\w+$/.test(email)) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err
        
            if (street && /\w+/.test(city) & /\w+/.test(state) && /\d{5}/.test(zip)) {
                const street_number = street.match(/^\d+/)
                const street_name = street.replace(street_number, '').trim()

                query(`insert into _customer (name, email, password, street_number, street_name, city, state, zip) values ('${name}', '${email}', '${password}', ${street_number}, '${street_name}', '${city}', '${state}', ${zip})`, next(true))
            }
            else {
                query(`insert into _customer (name, email, password) values ('${name}', '${email}', '${hash}')`, next(true))
            }
        })
    }
    else {
        next(false)
    }
}

function login(email, password, next) {
    query(`select password from _customer where email = '${email}'`, (hash) => {
        hash = JSON.parse(JSON.stringify(hash))[0].password
        
        bcrypt.compare(password, hash, (err, result) => {
            if (err) throw err

            if (typeof next === 'function') next(result)
        })
    })

}

function getAllCustomers() {

}

function getCustomer(email) {

}

function getCart(email, next) {
    query(`select email, item_id, _item.name, price from _item, cart_item where _item.id = cart_item.item_id and email = '${email}'`, (results) => {
        results.forEach(item => {
            if (!item.price) {
                item.price = 5
            }
        })
        next(JSON.parse(JSON.stringify(results)))
    })
    
}

function updateCustomer() {

}

function deleteCustomer() {

}


module.exports = {
    register,
    login,
    getAllCustomers,
    getCustomer,
    getCart,
    updateCustomer,
    deleteCustomer
}