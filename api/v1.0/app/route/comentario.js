var Post = require('../model/post');
var Usuario = require('../model/usuario');

module.exports = function(app, mongoose){

	app.post('/post/:idPost/comentario', function (req, res){

		Post.findById(req.params.idPost, function (err, post){

			Usuario.findById(req.body.usuario._id, function (err, usuario){
				if (err)
					res.json({status: false, data: err.message});

				var comentario = {
					usuario: {_id: usuario._id,	nome: usuario.nome},
					comentario: req.body.comentario
				};

				post.comentarios.push(comentario);
				post.data = post.data;

				post.save(function(err, post) {
					if (err)
						res.json({status: false, data: err.message});

					res.json({status: true, data: comentario});
				});

			});

		});

	});

	app.put('/post/:idPost/comentario/:idComentario', function (req, res){

		Post.findById(req.params.idPost, function (err, post){

			var comentario = post.comentarios.id(req.params.idComentario);

			comentario.comentario = req.body.comentario;
			comentario.data = comentario.data;

			post.data = post.data;

			post.save(function(err, post) {
				if (err)
					res.json({status: false, data: err.message});

				res.json({status: true, data: post});
			});		
		});	

	});

	app.delete('/post/:idPost/comentario/:idComentario', function (req, res){
		Post.findById(req.params.idPost, function (err, post){

			var comentario = post.comentarios.id(req.params.idComentario).remove();

			post.data = post.data;
			
			post.save(function(err, post) {
				if (err)
					res.json({status: false, data: err.message});

				res.json({status: true, data: post});
			});		
		});
	});

};