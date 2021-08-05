const express = require('express');
const { Category } = require('./database/models/category');
const router = express.Router()

// send array of categories (name, img, category_id)
router.get('/getCategories', (req, res) => {
    res.send('getting all categories.')
    // TODO - fetch all categories from database
    res.send(Category.findAll({}));
});

// recieve category_id
// send category info (name, desc) 
//  and array of products (name, img, price, left in stock)
router.get('/category/getCategory', (req, res) => {
    const { category_id } = req.body;

    res.send(`getting category info and products. category_id - ${ category_id }`)
    // TODO - fetch category/product list from database with category_id
});

// recieve product_id
// send product info (name, desc, img, price, left in stock)
router.get('/product/getProduct', (req, res) => {
    const { product_id } = req.body;

    res.send(`getting product info. product_id - ${ product_id }`);
    // TODO - fetch product info from database with product_id
});

// recieve email, product_id
// send confirmation
router.post('/customer/addToCart', (req, res) => {
    const { email, product_id, quantity } = req.body;

    res.send(`adding item to cart. email - ${ email }, product_id - ${ product_id }, quantity - ${ quantity }`);
    // TODO - modify product's quantity in database
    // TODO - add product to customer's cart in database
    // TODO - sned message confirming that product was added to cart
});

// recieve email
// send array of products in cart
router.get('/customer/getCart', (req, res) => {
    const { email } = req.body;

    res.send(`getting cart. email - ${ email }`);
    // TODO - get array of products in customer's cart
        // (name, img, quantity)
});

// recieve email, payment method, confirmation
// send message confirming the transaction was successful
router.post('/customer/createTransaction', (req, res) => {
    const { email, payment_method,  } = req.body;

    res.send(`new transaction. email - ${ email }, payment_method - ${ payment_method }`)
    // TODO - 
});

module.exports = router;