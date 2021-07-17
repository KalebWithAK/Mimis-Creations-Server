const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const shopRoutes = require('./routes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./orderRoutes');

// express configuration
const app = express();
app.use(express.json());

app.use(shopRoutes);
app.use(adminRoutes);
app.use(customerRoutes);
app.use(orderRoutes);

// connect to db
mongoose.connect(
    process.env.dbConnection, 
    {newUrlParser: true}, 
    () => {
            console.log('Connected to database.');
    }
);

// middleware

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(3001, () => {
    console.log('App listening at http://localhost:3001');
})