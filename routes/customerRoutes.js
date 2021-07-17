const { request } = require('express');
const express = require('express');
const router = express.Router();

router.get('/getCart', (req, res) => {
    const { email } = req.body;

    res.send(`Hello from getCart! customer email: ${email}`);
    
    // TODO
});

router.get('/getCurrentOrders', (req, res) => {
    const { email } = req.body;
    
    res.send(`Hello from getCurrentOrders! customer email: ${email}`);
});

router.get('/getPastOrders', (req, res) => {
    const { email } = req.body;

    res.send(`Hello from getPastOrders! customer email: ${email}`);
});

router.delete('/removeProduct/', (req, res) => {
    const { email, product_id } = req.body;

    res.send(`Hello from removeProduct! customer email: ${email}, product id: ${product_id}`);
});

router.delete('/clearCart', (req, res) => {
    const { email } = req.body;

    res.send(`Hello from clearCart! customer email: ${email}`);
});

router.post('/addToCart', (req, res) => {
    const { email, product_id } = req.body;

    res.send(`Hello from addToCart! customer email: ${email}, product id: ${product_id}`);
});

router.post('/checkout', (req, res) => {
    const { email } = req.body;

    res.send(`Hello from checkout! customer email: ${email}`);
})

module.exports = router;