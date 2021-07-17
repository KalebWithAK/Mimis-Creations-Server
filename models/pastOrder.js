const mongoose = require('mongoose');

const Order = require('./order');

const pastOrderSchema = mongoose.Schema({
    order: { type: Order, required: true },
    completeDate: { type: Date }
});