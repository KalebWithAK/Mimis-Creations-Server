const express = require('express')
const cors = require('cors')
require('dotenv').config()

const customer_router = require('./routes/customer')
const category_router = require('./routes/category')
const item_router = require('./routes/item')


// initialize app
const app = express();
const port = process.env.PORT || 3001;


// configure app
app.use(cors());
app.use(express.json());

// routes
app.use('/api/customer', customer_router)
app.use('/api/category', category_router)
app.use('/api/item', item_router)


// run app on specified port
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${ port }`);
})