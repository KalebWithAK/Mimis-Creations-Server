const router = require('express').Router();
const Order = require('../models/order');

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
        .then(() => { res.send(`Checkout was successful for customer with id: ${ customer }`) })
        .catch(err => res.status(400).json('Error: ' + err));

    // TODO - remove all items from user's cart
});

// update specified order
router.put('/:order_id', (req, res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        res.send('Not implemented');

        // TODO - update existing order and save
    }
});

// delete order
router.delete('/admin/:order_id', (req, res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        res.send('Not implemented');

        // TODO - delete order, not sure if this should be allowed
    }
});

module.exports = router;