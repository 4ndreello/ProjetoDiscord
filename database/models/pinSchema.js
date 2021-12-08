const mongoose = require('mongoose');
const InfoScan = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    pin: String,
    elapsed: String,
    found: String,
    pc: String,
    stats: String,
    horario: String,
    expired: Boolean,
    alts: String,
    bin: String,
    proc: String,
    location: String,
});

module.exports = new mongoose.model('InfoScan', InfoScan, 'info');