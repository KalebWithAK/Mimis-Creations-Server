const express = require('express');
const router = express.Router();

router.get('/getCategories', (req, res) => {
    // get categories list from db
    res.send('Hello from getCategories');
});

router.get('/getCategory/:category_id', (req, res) => {
    // get category from db with category_id
    // sends category_info (includes product array)
    res.send(`Hello from getCategory! category id: ${req.params.category}`);
});

router.get('/getProduct/:product_id', (req, res) => {
    res.send(`Hello from getProduct! product id: ${req.params.product_id}`);
});

router.post('/addToCart/', (req, res) => {
    const { product_id, customer_id } = req.body;
    res.send(`Hello from addToCart! product id: ${product_id}, customer_id: ${customer_id}`);
});

module.exports = router;