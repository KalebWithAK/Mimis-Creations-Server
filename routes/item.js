const express = require('express')
const router = express.Router()
const {
    createItem,
    getAllItems,
    getItem,
    getItemsByCategory,
    updateItem,
    addToCart,
    deleteItem
} = require('../handlers/item')

router.route('/')
    .get((req, res) => {
        getAllItems(items => {
            res.json(items)
        })
    })
    .post((req, res) => {
        const { category_id, item_id } = req.body
        if (item_id) {
            getItem(item_id, item => {
                res.json(item)
            })
        }

        if (category_id) {
            getItemsByCategory(category_id, items => {
                res.json(items)
            })
        }
    })

    router.route('/addToCart')
        .post((req, res) => {
            const { email, item_id } = req.body
            addToCart(email, item_id, (success) => {
                res.json({ success })
            })
        })

module.exports = router