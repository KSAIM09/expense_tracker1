const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/auth.middleware')
router.get('/', async(req, res) => {
    try {
        res.render('homepage', {title: 'Home Page', user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get('/about', (req, res) => {
    res.render('aboutPage', {title: 'About Page', user: req.user });
})

module.exports = router;