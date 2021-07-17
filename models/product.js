const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    desc: String,
    price: { type: Number, required: true },
    inStock: { type: Number, required: true }
});

module.exports = mongoose.model('Products', ProductSchema);