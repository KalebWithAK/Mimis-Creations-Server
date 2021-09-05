// import required modules (express, cors, mongoose, dotenv)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


// initialize app
const app = express();
const port = process.env.PORT || 3001;


// configure app
app.use(cors());
app.use(express.json());


// connect to MongoDB Atlas using mongoose
const uri = process.env.DB_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('open', () => {
    console.log('Successfully connected to MongoDB');
});


// using routers
const category_router = require('./routers/category_routes');
const customer_router = require('./routers/customer_routes');
const order_router = require('./routers/order_routes');
const product_router = require('./routers/product_routes');

app.use('/category', category_router);
app.use('/customer', customer_router);
app.use('/order', order_router);
app.use('/product', product_router);


// run app on specified port
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${ port }`);
})