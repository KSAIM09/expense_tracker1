const express = require("express");
const router = express.Router();
const User = require("../models/user.schema");

// authmiddleware
const { isLoggedIn } = require('../middlewares/auth.middleware')

const upload = require("../middlewares/multimedia.middleware");
const fs = require("fs");
const path = require('path');







// Passport auth to User
const passport = require('passport');
const LocalStrategy = require('passport-local');


passport.use(new LocalStrategy(User.authenticate()));
// passport.use(User.createStrategy()); // crediential other than username 





// Sign Up
router.get('/signup', async (req, res) => {
    res.render('signUpUser', { title: "Sign-Up", user: req.user })
});

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await User.register({ username, email }, password);
        // await UserSchema.authenticate(username, password);
        // res.redirect("/user/profile");
        res.redirect("/user/signin");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Sign In
router.get("/signin", async (req, res) => {
    res.render("signInUser", { title: "Sign-In", user: req.user });
});


// This can be used for better error handling...
router.post("/signin", passport.authenticate("local"), async (req, res) => {
    try {
        req.flash("success", "Successfully Logged In!");
        res.redirect("/user/profile");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// or this can be use easily
// router.post(
//     "/signin",
//     passport.authenticate("local", {
//         successRedirect: "/user/profile",
//         failureRedirect: "/user/signin",
//     }),
//     (req, res) => {}
// );


// To Show Profile
router.get('/profile',isLoggedIn, async (req, res) => {
    try {
        const message = req.flash("success");
        res.render('userProfile', { title: "User Profile", user: req.user, message: message });
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
});

// .............x..................x..................x...............................x

// To Reset Password, Delete Account, Update user Profile .........

router.get('/reset-password', isLoggedIn, async (req, res) => {
    try {
        res.render('resetPassword', { title: "Reset Password", user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/reset-password', isLoggedIn, async (req, res) => {
    try {
        await req.user.changePassword(
            req.body.oldpassword,
            req.body.newpassword
        )
        await req.user.save();
        req.flash("success", "Password Changed!");
        res.redirect('/user/profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
})



// router.post('/reset-password', isLoggedIn, async (req, res) => {
//     try {
//         // Assuming req.user is a Passport user object
//         await req.user.changePassword(req.body.oldpassword, req.body.newpassword);
//         await req.user.save(); // This save() should only save the password, not the username
//         res.redirect('/user/profile');
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });


// Delete Account
router.get('/delete-account', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        
        // code to delete profile pic
        if(user.avatar != "default.png") {
            fs.unlinkSync(`public/images/${user.avatar}`);
        }
        // code to delete all relaated expenses

        res.redirect("/user/signin");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// To update User Profile
router.get("/update", isLoggedIn, async (req, res) => {
    res.render("updateUser", {
        title: "Update User",
        user: req.user,
    });
});

router.post("/update", isLoggedIn, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, req.body);
        req.flash("success", "User Details Updated!");
        res.redirect("/user/profile");
    } catch (error) {
        res.status(500).send(error.message);
    }
});




const filePath = path.join(__dirname, 'public', `images`, 'default.png')
// To uPDATE user Avatar
router.post(
    "/avatar",
    isLoggedIn,
    upload.single("avatar"),
    async (req, res) => {
        try {
            // if (req.user.avatar != "default.png") {
            //     fs.unlinkSync(`public/images/${req.user.avatar}`);
            // }

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("File deleted successfully");
                }
            })
            req.user.avatar = req.file.filename;
            await req.user.save();
            res.redirect("/user/update");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
);


module.exports = router;