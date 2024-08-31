const express = require("express");
const router = express.Router();
const UserSchema = require("../models/user.schema");

// authmiddleware
const { isLoggedIn } = require('../middlewares/auth.middleware')
// Passport auth to User
const passport = require('passport');
const LocalStrategy = require('passport-local');
passport.use(
    new LocalStrategy(UserSchema.authenticate())
);

// passport.use(User.createStrategy()); // crediential other than username 

// Sign Up
router.get('/signup', async (req, res) => {
    res.render('signUpUser', { title: "SignUp", user: req.user })
});

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await UserSchema.register({ username, email }, password);
        // await UserSchema.authenticate(username, password);
        // res.redirect("/user/profile");
        res.redirect("/user/signin");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Sign In
router.get("/signin", async (req, res) => {
    res.render("signInUser", { title: "SignIn", user: req.user });
});


// This can be used for better error handling...
// router.post("/signin", passport.authenticate("local"), async (req, res) => {
//     try {
//         res.redirect("/user/profile");
//     } catch (error) {
//         next(error);
//     }
// });


// or this can be use easily
router.post(
    "/signin",
    passport.authenticate("local", {
        successRedirect: "/user/profile",
        failureRedirect: "/user/signin",
    }),
    (req, res) => {}
);


// To Show Profile
router.get('/profile',isLoggedIn, async (req, res) => {
    try {
        res.render('userProfile', { title: "User Profile", user: req.user})
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// To Sign Out
router.get('/signout', isLoggedIn, async (req, res) => {
    try {
        req.logout(() => {
            res.redirect('/user/signin');
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router;