var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ComentarioSchema = new Schema({
	usuario: {},
	comentario: String,
	data: {type: Date, default: Date.now}
});

var PostSchema = new Schema({
	usuario: {
		_id: Schema.ObjectId,
		nome: String
	},
	descricao: String,
	comentarios: [ComentarioSchema],
    data: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', PostSchema);