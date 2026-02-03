require('dotenv').config();
const express = require('express');
const app = express();

const dbConnect = require('./config/dbconnect');
const urlRoutes = require('./routes/url');

dbConnect();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello World!");
});

app.use('/api',urlRoutes);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is listening to port= ${port}`);
});

