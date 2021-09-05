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
        .then(() => res.send(`Successfully created new product ${ name }`))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

// update specified product
router.put('/admin/:product_id', (req, res) => {
    const product = req.params.product_id;

    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        //res.send('Not implemented');

        // save current prodcut info
        let currentInfo;

        Product.find({ _id: product })
        .then(product => currentInfo = product)
        .catch(err => res.status(400).json('Error: ' + err));

        // change product info depending on req.body
        const name = req.body.name || currentInfo.name;
        const desc = req.body.desc || currentInfo.desc || null;
        const inStock = req.body.inStock || currentInfo.inStock || null;
        const category = req.body.category || currentInfo.category;

        Product.updateOne({ _id: product }, { name, desc, inStock, category })
        .then(() => res.send(`Successfully updated product ${ product }`))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

// delete specified product
router.delete('/admin/:product_id', (req, res) => {
    const product = req.params.product_id;

    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        //res.send('Not implemented');
        
        Product.deleteOne({ _id: product })
        .then(() => res.send(`Successfully deleted product ${ product }`))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

// delete all products
router.delete('/admin', (req, res) => {
    if (!req.body.admin_key || !req.body.confirmation) {
        res.send('You are not authorized to access this route');
    } else {
        //res.send('Not implemented');

        Product.deleteMany({})
        .then(() => res.send('Successfully deleted all products'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

module.exports = router;