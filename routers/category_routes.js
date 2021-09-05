const router = require('express').Router();
const Category = require('../models/category');

// list all categories
router.get('/', (req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('Error: ' + err));
})

// send specified category
router.get('/:category_name', (req, res) => {
    Category.find({name: req.params.category_name})
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('Error: ' + err));
});

// create new category
router.post('/admin/create', (req, res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route')
    } else {
        const name = req.body.name;

        const newCategory = new Category({ name });

        newCategory.save()
            .then(() => { res.send(`Successfully created new category with name: ${ name }`) })
            .catch(err => res.send(400).json('Error: ' + err));
    }
});

// update specified category
router.put('/admin/:category_id', (req, res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        res.send('Not implemented');

        // TODO - change category's name (and/or description in the future)
    }
});

// delete specified category
router.delete('/admin/:category_id', (req, res) => {
    if (!req.body.admin_key) {
        res.send('You are not authorized to access this route');
    } else {
        res.send('Not implemented');

        // TODO - delete category
    }
});

module.exports = router;