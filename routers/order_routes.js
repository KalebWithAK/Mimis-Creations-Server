const router = require('express').Router();
const Order = require('../models/order');
const Customer = require('../models/customer');
const Product = require('../models/product');

// list all orders
router.get('/admin', (req, res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        Order.find()
            .then(orders => res.json(orders))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});

// send info about specified order by id
router.get('/id/:order_id', (req, res) => {
    Order.find({ _id: req.params.order_id })
        .then(order => res.send(order))
        .catch(err => res.status(400).json('Error: ' + err));
})

// send info about orders made by the same customer
router.get('/customer/:customer_id', (req, res) => {
    Order.find({ customer: req.params.customer_id })
        .then(order => res.send(order))
        .catch(err => res.status(400).json('Error: ' + err));
});

// create a new order (checkout)
router.post('/customer/:customer_id', (req, res) => {
    const customer = req.params.customer_id;
    const { products, transaction } = req.body;

    const newOrder = new Order({ customer, products, transaction });
    newOrder.save()
        .then(() => res.send(`Checkout was successful for customer ${ customer }`))
        .catch(err => res.status(400).json('Error: ' + err));

    // TODO - remove all items from user's cart
    Customer.updateOne({ _id: customer }, { cart: []})
    .then(() => console.log(`Emptied customer ${ customer }'s cart because a new order was placed`))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update specified order
router.put('/admin/:order_id', (req, res) => {
    const order = req.params.order_id;

    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        //res.send('Not implemented');

        // TODO - update existing order and save
        let currentInfo;

        Order.find({ _id: order })
        .then(order => currentInfo = order)
        .catch(err => res.status(400).json('Error: ' + err));

        // change product info depending on req.body
        const name = req.body.name || currentInfo.name;
        const desc = req.body.desc || currentInfo.desc || null;
        const inStock = req.body.inStock || currentInfo.inStock || null;
        const category = req.body.category || currentInfo.category;

        Product.updateOne({ _id: order })
        .then(() => res.send(`Successfully updated order ${ order }`))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

// delete specified order
router.delete('/admin/:order_id', (req, res) => {
    const order = req.params.order_id;

    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        //res.send('Not implemented');

        Order.deleteOne({ _id: order })
        .then(() => res.send(`Successfully deleted order ${ order }`))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

// delete all orders
router.delete('/admin', (req, res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        Product.deleteMany({})
        .then(() => res.send('Successfully deleted all products'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

module.exports = router;