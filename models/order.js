const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', quantity: { type: Number, default: 1 }}],
    status: { type: String, enum: ['PROCESSING', 'CONFIRMED', 'SHIPPING', 'DELIVERED'], default: 'PROCESSING', required: true },
    completed: { type: Boolean, default: false },
    transactions: [{ 
        amount: {
            total: { type: Number, required: true },
            currency: { type: String, default: 'USD' },
            details: {
                subtotal: { type: Number, required: true },
                tax: { type: Number, required: true }
            }
        }
    }]
}, { timestamp: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;