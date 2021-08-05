const router = require('express').Router();
const Customer = require('../models/customer');

// list all customers
router.get('/admin', (req,res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        Customer.find()
            .then(customers => res.json(customers))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});

// send info about specified customer by id
router.get('/id/:customer_id', (req, res) => {
    Customer.find({ _id: req.params.customer_id })
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});

// send info about specified customer by email
router.get('/email/:customer_email', (req, res) => {
    Customer.find({ email: req.params.customer_email })
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});

// create new customer
router.post('/', (req, res) => {
    const name = req.body.name || '';
    const email = req.body.email;
    const cart = [];
    const orders = [];

    const newCustomer = new Customer({ name, email, cart, orders });
    newCustomer.save()
        .then(() => { res.send(`Successfully created new customer with email: ${ email }`) })
        .catch(err => res.status(400).json('Error: ' + err));
});

// update specified customer
router.put('/:customer_id', (req, res) => {
    res.send('Not implemented');
});

// add item to cart
router.put('/:customer_id/addToCart/:product_id', (req, res) => {
    res.send('Not implemented');

    // TODO - push product_id to user's cart array
});

// delete customer
router.delete('/:customer_id', (req, res) => {
    res.send('Not implemented');

    // TODO - delete customer
});

module.exports = router;