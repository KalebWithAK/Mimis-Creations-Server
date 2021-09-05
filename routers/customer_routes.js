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
    const customer = req.params.customer_id;
    //res.send('Not implemented');

    // save current customer info
    let currentInfo;

    Customer.find({ _id: customer })
    .then(customer => currentInfo = customer)
    .catch(err => res.status(400).json('Error: ' + err));

    // change customer info depending on req.body
    const name = req.body.name || currentInfo.name || null;
    const email = req.body.email || currentInfo.email;

    Customer.updateOne({ _id: customer}, { name, email })
    .then(() => res.send(`Successfully updated customer ${ customer }`))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add item to cart
router.put('/customer/:customer_id/addToCart/:product_id', (req, res) => {
    const { customer, product } = req.params;
    //res.send('Not implemented');

    // save customer's current cart
    let cart;

    Customer.find({ _id: customer })
    .then(customer => cart = customer.cart)
    .catch(err => res.status(400).json('Error: ' + err));

    // add new product to cart
    cart.push(product);

    // update customer's cart with product added
    Customer.updateOne({ _id: customer}, { cart })
    .then(() => res.send(`Successfully added product ${ product } to customer ${ customer }'s cart`))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete customer
router.delete('/:customer_id', (req, res) => {
    const customer = req.params.customer_id;

    //res.send('Not implemented');

    Customer.deleteOne({ _id: customer })
    .then(() => res.send(`Successfully deleted customer ${ customer }`))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete all customers
router.delete('/admin', (req, res) => {
    if (!req.body.admin_key || !req.body.confirmation) {
        req.send('You are not authorized to access this route');
    } else {
        Product.deleteMany({})
        .then(() => res.send('Successfully deleted all customers'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

module.exports = router;