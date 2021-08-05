const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    confirmation: { type: String, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    paymentMethod: { type: String, required: true }, // square, venmo, paypal
    amount: { type: Number, required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }
}, { timestamp: true }, { collection: 'transactions' });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;