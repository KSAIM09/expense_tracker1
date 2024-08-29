const express = require("express");
const router = express.Router();

const ExpenseSchema = require('../models/expense.schema');

// Create Page
router.get('/create', (req, res) => {
    res.render('createExpense', { title: "Expense Creater" });
});

// Getting Data from Create Page
router.post('/create', async (req, res) => {
    try {
        const newExpense = new ExpenseSchema(req.body);
        await newExpense.save();
        res.redirect('/expense/show');
    } catch (error) {
        res.status(500).send(error.message);
    }
})





// Show Expenses Page
router.get('/show', (req, res) => {
    res.render('showExpense', { title: "Your Expense" });
});


module.exports = router;