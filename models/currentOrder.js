const mongoose = require('mongoose');

const Product = require('./product');

const CurrentOrderSchema = mongoose.Schema({
    order: { type: Order, required: true },
    startDate: { type: Date, default: Date.now() },
    progress: { type: String, default: 'processing' }
});

module.exports = mongoose.model('CurrentOrders', CurrentOrderSchema);