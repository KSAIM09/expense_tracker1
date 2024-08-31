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
// router.get('/show', (req, res) => {
//     res.render('showExpense', { title: "Your Expense" });
// });


// Getting data from DB and providing to Show Expense Page.
router.get('/show', async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find();
        res.render('showExpense', { title: "Your Expenses", expenses: expenses });
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Getting details from the id and providing that details to DETAILS PAGE
router.get('/details/:id', async (req, res) => {
    try {
        const expense = await ExpenseSchema.findById(req.params.id);
        res.render('showExpenseDetails', { title: "Expense Details", expense: expense })
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// Deleting expenses of perticular id
router.get('/delete/:id', async (req, res) => {
    try {
        await ExpenseSchema.findByIdAndDelete(req.params.id);
        res.redirect("/expense/show");
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// To update the expenses there always be two step 1 as get 2 as post

router.get("/update/:id", async (req, res) => {
    try {
        const expense = await ExpenseSchema.findById(req.params.id);
        res.render("updateExpense", {
            title: "Update Expense",
            expense: expense,
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.post("/update/:id", async (req, res) => {
    try {
        await ExpenseSchema.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/expense/details/" + req.params.id);
    } catch (error) {
        res.status(500).send(error.message)
    }
});





module.exports = router;