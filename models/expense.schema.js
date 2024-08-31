const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is Required"],
        minLength: [3, "Title must be atleast 3 character long."],
        maxLength: [15, "Title must not exceed more than 15 Characters."],
        trim: true,
    },
    
    amount: {
        type: Number,
        required: [true, "Amount is Required"],
    },

    category: {
        type:  String,
        required: [true, "Category is Required"],
        minLength: [3, "Category must be atleast 3 character long."],
        maxLength: [50, "Category must not exceed more than 50 Characters."],
        lowercase: true,
        trim: true,
    },

    remark: {
        type: String,
        maxLength: [100, "Remark must not exceed more than 100 Characters."],
        trim: true,
        minLength: [5, "Remark must be atleast 5 Characters long."],
    },

    paymentmode: {
        type: String,
        required: [true, "Payment Mode is Required"],
        enum: ["cash", "card", "upi", "cheque"],
        lowercase: true,
    },

}, { timestamps: true });

const ExpenseSchema = mongoose.model('expense', expenseSchema);

module.exports = ExpenseSchema;