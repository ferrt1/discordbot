const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
    guildId: String,
    bienvenidas: {type: Object, default: {canal: "", fondo:"", mensaje: "Bienvenido {usuario}, pasala bien!"}},
});


module.exports = new mongoose.model("Setup", setupSchema, "welcome");