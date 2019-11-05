const express = require('express');
const app =express();

const config= require('./DB');

//help us to read the data from post and put requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const PORT = 4000;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//cross origin Resource Sharing  => handling port block error
const cors = require('cors');
app.use(cors());

const proRouter = require('./product.route');

mongoose.connect(config.DB,{useNewUrlParser:true})
        .then(res=>{
            console.log('Database successfully connected..');
        },
        err=>{
            console.log(err);
        }
    );

//setting up primary  route
app.use('/product',proRouter);

app.listen(PORT,function(){
    console.log('Server is running on url http://localhost:4000/product');
});