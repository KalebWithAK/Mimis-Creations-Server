const router = require('express').Router();
const Order = require('../models/order');
const Product = require('../models/product');

// list all products
router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

// send info about specified product by id
router.get('/id/:product_id', (req, res) => {
    Order.find({ _id: req.params.product_id })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

// send info about all products in the same category
router.get('/category/:category_id', (req, res) => {
    Product.find({ category: req.params.category_id })
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

// create new product
router.post('/admin/create', (req, res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        const { name, desc, inStock, category } = req.body;

        const newProduct = new Product({ name, desc, inStock, category });
        newProduct.save()
        .then(() => { res.send(`Successfully created new product with name: ${ name }`) })
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

// update specified product
router.put('/admin/:product_id', (req, res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        res.send('Not implemented');

        // TODO - change product's info
    }
});

// delete specified product
router.delete('/admin/:product_id', (req, res) => {
    if (!req,body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        res.send('Not implemented');

        // TODO - delete product
    }
});

module.exports = router;