const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', quantity: { type: Number, default: 1 }}],
    status: { type: String, enum: ['PROCESSING', 'CONFIRMED', 'SHIPPING', 'DELIVERED'], default: 'PROCESSING', required: true },
    completed: { type: Boolean, default: false },
    transaction: { 
        confirmation: { type: String, required: true },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
        paymentMethod: { type: String, required: true }, // square, venmo, paypal
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now() }
    }
}, { timestamp: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;