const express = require('express')
const router = express.Router()
const {
    register,
    login,
    getAllCustomers,
    getCustomer,
    getCart, 
    updateCustomer,
    deleteCustomer
} = require('../handlers/customer')
const { getItemsByCategory } = require('../handlers/item')

router.route('/')
    .get((req, res) => {
        res.end(getAllCustomers())
    })

router.route('/register')
    .post((req, res) => {
        const { name, email, password, street, city, state, zip } = req.body
        register(name, email, password, street, city, state, zip, (success) => {
            if (success) {
                res.json({ logged_in: email })
            }
            else {
                res.json({ logged_in: false })
            }
        })
    })

router.route('/login')
    .post((req, res) => {
        const { email, password } = req.body

        login(email, password, (success) => {
            if (success) {
                res.json({ logged_in: email })
            }
            else {
                res.json({ logged_in: false })
            }
        })
    })

router.route('/cart')
    .post((req, res) => {
        const { email } = req.body

        getCart(email, (cart_items) => {
            res.json(cart_items)
        })
    })

module.exports = router