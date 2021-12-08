const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    pins_gen: Number,
    pego_por_ultimo: String,
    timeout_cmd: Number,
    pin: String,
    pin_ativo: Boolean,
    encontrado: String,
    tempo_scan: String,
    channel_id: String,
});

module.exports = new mongoose.model('Usuarios', usersSchema, 'users');