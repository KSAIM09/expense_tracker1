const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        res.render('homepage', {title: 'Home Page'});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get('/about', (req, res) => {
    res.render('aboutPage', {title: 'About Page'});
})

module.exports = router;