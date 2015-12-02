var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsuarioSchema = new Schema({
    nome: String,
    email: {type: String, lowercase: true},
    senha: String,
    cadastro: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);