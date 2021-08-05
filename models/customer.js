const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', quantity: { type: Number, default: 1}}],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;