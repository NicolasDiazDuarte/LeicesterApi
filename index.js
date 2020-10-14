const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const lastMatchData = require('./data/lastMatchData');


//Connect Mongo 
mongoose.Promise=global.Promise
mongoose.connect('mongodb://localhost:27017',{
    dbName:process.env.DB_NAME,
    user:process.env.DB_USER,
    pass:process.env.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//webscrapping data 
lastMatchData.lastMatch()


// Create the server 
const app = express();

// Routes of the app 
app.use('/',routes() )

// Port 
app.listen(5000)  
