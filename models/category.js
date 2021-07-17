const mongoose = require('mongoose');

const Product = require('./product');

const CategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    products: [{ product: Product }],
});

module.exports = mongoose.model('Categories', CategorySchema);