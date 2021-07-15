const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true
}

const adminSchema = new mongoose.Schema({
    email: reqString,
    passwordHash: reqString,
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin; 