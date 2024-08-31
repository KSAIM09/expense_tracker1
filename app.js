const dotenv = require('dotenv')
dotenv.config('./.env');

const express = require('express');
const logger = require('morgan');
const path = require('path');
var cookieParser = require("cookie-parser");

// passport required with session and userSchema
const passport = require("passport");
const session = require("express-session");
const User = require('./models/user.schema')

const app = express();

//require Flash Message 
var flash = require('connect-flash');

// require routes
const homePageRouter = require('./routes/homePageRouter');
const expenseRouter = require('./routes/expenses.routes');
const userRouter = require('./routes/user.routes');

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



// Passport Auth and Session Config
app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // cookie: {
        //     secure: false,
        //     maxAge: 1000 * 60 * 60 * 24,
        // },
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect-flash 
app.use(flash());


// Routes
app.use('/', homePageRouter);
app.use('/expense', expenseRouter);
app.use('/user', userRouter)



// Server listen
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);  
});