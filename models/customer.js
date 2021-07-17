const mongoose = require('mongoose');

const Product = require('./product');
const CurrentOrder = require('./currentOrder');
const PastOrder = require('./pastOrder');

const CustomerSchema = mongoose.Schema({
    email: { type: String, required: true },
    cart: [{ type: Product }],
    currentOrders: [{ type: CurrentOrder }],
    pastOrders: [{ type: PastOrder }]
});

module.exports = mongoose.model('Customers', CustomerSchema);