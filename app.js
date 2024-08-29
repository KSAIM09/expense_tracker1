const dotenv = require('dotenv')
dotenv.config('./.env');

const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

// require routes
const homePageRouter = require('./routes/homePageRouter');
const expenseRouter = require('./routes/expenses.routes')

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));


// logger
// app.use(logger("dev"));

// For data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./config/dbConnect');


// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', homePageRouter);
app.use('/expense', expenseRouter) ;

// Server listen

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);  
});