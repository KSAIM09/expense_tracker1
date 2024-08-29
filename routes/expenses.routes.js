const express = require("express");
const router = express.Router();

router.get('/create', (req, res) => {
    res.render('createExpense', { title: "Expense Creater" });
});

router.get('/show', (req, res) => {
    res.render('showExpense', { title: "Your Expense" });
});


module.exports = router;