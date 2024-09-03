const mongoose = require("mongoose");
// passport
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [15, "Username must not exceed 15 characters"],
        trim: true,
    },
    password: String,
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email format"],
    },
    avatar: {
        type: String,
        default:"default.png",
    },
});

// Uncomment if you want to use email as the username for authentication
// userSchema.plugin(plm, { usernameField: "email" }); 
userSchema.plugin(plm);

const User = mongoose.model("User", userSchema); // Changed to 'User'
module.exports = User;
