const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    pass: String,
});

module.exports = new mongoose.model('Admins', adminSchema, 'admin');