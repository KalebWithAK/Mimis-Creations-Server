const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    customer_id: { type: Number, required: true },
    amount: { type: Number, required: true },
    payment_type: { type: String, required: true },
    confirmation: { type: String, default: null /* randomly generated string */ },
    datetime: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Transaction', TransactionSchema);