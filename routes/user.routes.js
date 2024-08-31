const express = require("express");
const router = express.Router();
const UserSchema = require("../models/user.schema");

// Passport auth to User
const passport = require('passport');
const LocalStrategy = require('passport-local');
passport.use(
    new LocalStrategy(UserSchema.authenticate())
);

// passport.use(User.createStrategy()); // crediential other than username 

router.get('/signup', async (req, res) => {
    res.render('signUpUser', { title: "SignUp" })
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

router.get("/signin", async (req, res) => {
    res.render("signinUser", { title: "SignIn" });
});

module.exports = router;