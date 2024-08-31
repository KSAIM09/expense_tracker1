const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/auth.middleware')

// Homepage Route
router.get('/', async(req, res) => {
    try {
        res.render('homepage', {title: 'Welcome To Expense Tracker', user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
})


// About Page Route
router.get('/about', (req, res) => {
    res.render('aboutPage', {title: 'About Page', user: req.user });
})


// CREATING SESSION , USING COOKIES, AND FLASH MESSAGE, USING ROUTES.............

// Create Session
router.get('/createsession', (req, res) => {
    req.session.expenselogin = true;
    res.status(200).json({ message: "Session Created" });
})

// Check Session
router.get('/checksession', (req, res) => {
    if (req.session.expenselogin) {
        res.status(200).json({ message: "Session Active" });
    } else {
        res.status(200).json({ message: "No Session Found" });
    }
})

// Destroy Session
router.get('/destroysession', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ message: "Session Destroyed" });
    });
});


// Create Cookie.................................
router.get('/createcookie', (req, res) => {
    res.cookie("expenselogin", true, {
        maxAge: 20000,
        secure: true,
        httpOnly: true,
    });
    res.status(200).json({ message: "Cookie Created" });
});

// Check Cookie
router.get('/checkcookie', (req, res) => {
    console.log(req.cookies)
    if (req.cookies.expenselogin) {
        res.status(200).json({ message: "Cookie Active" });
    } else {
        res.status(200).json({ message: "No Cookie Found" });
    }
});

// Destroy Cookie
router.get('/destroycookie', (req, res) => {
    res.clearCookie("expenselogin");
    res.status(200).json({ message: "Cookie Destroyed" });
});


// Create Flash Message
router.get('/createflash', (req, res) => {
    req.flash('success', 'Flash Message Created Successfully!');
    res.status(200).json({ message: "Flash Message Created Successfully!"})
});

// Check Flash Message
router.get('/checkflash', (req, res) => {
    console.log(req.flash())
    if (req.flash('success')) {
        res.status(200).json({ message: req.flash('success')[0] });
    } else {
        res.status(200).json({ message: "No Flash Message Found" });
    }
});

// Destroy Flash Message
router.get('/destroyflash', (req, res) => {
    req.flash('success');
    res.status(200).json({ message: "Flash Message Destroyed" });
});
module.exports = router;