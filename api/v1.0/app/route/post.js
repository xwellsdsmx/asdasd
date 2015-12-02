var Post = require('../model/post');
var Usuario = require('../model/usuario');

module.exports = function(app, mongoose){

	app.post('/post', function (req, res){

		Usuario.findById(req.body.idUsuario, function (err, usuario){
			if (err)
				res.json({status: false, data: err.message});

			var post = new Post();

			post.usuario = {
				_id: usuario._id,
				nome: usuario.nome
			};
			
			post.descricao = req.body.descricao;

			post.save(function (err, post) {
				if (err)
					res.json({status: false, data: err.message});

				res.json({status: true, data: post});
			});
		});		

	});

	app.get('/post', function (req, res){

		Post.find().sort('-data').exec(function (err, posts){
			if (err)
				res.json({status: false, data: err.message});

			res.json({status: true, data: posts});
			
		});

	});

	app.get('/post/:idPost', function (req, res){

		Post.findById(req.params.idPost, function (err, posts){
			if (err)
				res.json({status: false, data: err.message});

			res.json({status: true, data: posts});
		});

	});

	app.put('/post/:idPost', function (req, res){

		Post.findById(req.params.idPost, function (err, post){

			post.descricao = req.body.descricao;

			post.save(function(err, post) {
				if (err)
					res.json({status: false, data: err.message});

				res.json({status: true, data: post});
			});

		});	

	});

	app.delete('/post/:idPost', function (req, res){
		Post.remove({
	      _id: req.params.idPost
	    }, function(err) {
	      if (err)
	        res.json({status: false, data: err.message});

	      res.json({status: true});
	    });
	});

};