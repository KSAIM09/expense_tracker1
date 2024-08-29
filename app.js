const dotenv = require('dotenv')
dotenv.config('./.env');

const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

// require routes
const homePageRouter = require('./routes/homePageRouter');

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));


// logger
app.use(logger("dev"));

// For data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', homePageRouter); 

// Server listen

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);  
});