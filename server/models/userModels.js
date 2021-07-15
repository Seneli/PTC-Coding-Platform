const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true
}

const userSchema = new mongoose.Schema({
    firstName: reqString,
    lastName: reqString,
    email: reqString,
    passwordHash: reqString,
    score: {
        type: Number,
        default: 0
        },
    week1q1: [Number],
    week1q2: [Number],
    week1q3: [Number],
    week2q1: [Number],
    week2q2: [Number],
    week2q3: [Number],
    week3q1: [Number],
    week3q2: [Number],
    week3q3: [Number],
    week4q1: [Number],
    week4q2: [Number],
    week4q3: [Number]
});

const User = mongoose.model("user", userSchema);

module.exports = User; 