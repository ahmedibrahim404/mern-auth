const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
mongoose.connect('mongodb://localhost:27017/authR');

 
// app.use(function (req, res, next) {

//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     res.setHeader('Access-Control-Allow-Credentials', true);

//     next();
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(cors());
app.use('/auth', authRoutes);


app.listen(8000, () => console.log("Go and Enjoy :'D "))