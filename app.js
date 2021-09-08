const express = require('express');
const cors =require('cors');
const mongoose = require('mongoose');
require('dotenv/config')

//Initialize App, enale cors, define our app to "reformat" the response to json
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true}));

app.use(express.json());

//Import Routes
const usersRoute = require('./routes/users');
const orderRoute = require('./routes/orders');
const productRoute = require('./routes/product');
app.use('/api', usersRoute)
app.use('/api', orderRoute)
app.use('/api', productRoute)
//Routes
app.get('/', (req, res)=>{
    res.send('hello');
});

//Connect to mongodb
mongoose.connect(process.env.DBACCESS, ()=>
    console.log('connected')
)
//Listen to server
app.listen(3000);