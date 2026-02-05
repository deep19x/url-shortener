require('dotenv').config();
const express = require('express');
const app = express();

const dbConnect = require('./config/dbconnect');
const urlRoutes = require('./routes/url');
const indexRoutes = require('./routes/index');

dbConnect();

app.use(express.json());

app.use('/api',urlRoutes);
app.use('/',indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is listening to port= ${port}`);
});

