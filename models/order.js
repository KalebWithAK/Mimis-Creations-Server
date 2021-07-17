const mongoose = require('mongoose');

const Product = require('./product');
const Transaction = require('./transaction');

const OrderSchema = mongoose.Schema({
    customer_id: { type: Number, required: true },
    transaction: { type: Transaction, required: true },
    products: [{ type: Product, quantity: Number }],
    total: { type: Number, required: true },
    shippingAddress: { type: String, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);