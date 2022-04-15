const express = require('express')
const router = express.Router()
const {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../handlers/category')

router.route('/')
    .get((req, res) => {
        getAllCategories(categories => {
            res.json(categories)
        })
    })
    .post((req, res) => {
        const { category_id } = req.body
        
        if (category_id) {
            getCategory(category_id, category => {
                res.json(category)
            })
        }
    })

module.exports = router