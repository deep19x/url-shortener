require('dotenv').config();
const express = require('express');
const app = express();

const dbConnect = require('./config/dbconnect');
const urlRoutes = require('./routes/url');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const linksRoutes = require('./routes/links');

dbConnect();

app.use(express.json());

app.use('/api',urlRoutes);
app.use('/',indexRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/links',linksRoutes);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is listening to port= ${port}`);
});

