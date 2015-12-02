var Usuario = require('../model/usuario');
var Post = require('../model/post');

module.exports = function(app, mongoose, sha1){

	app.post('/login', function (req, res){

		Usuario.findOne({email: req.body.email, senha: sha1(req.body.senha)}, function (err, usuario){
			if (err)
				res.json({status: false, data: err.message});

			if(usuario){
				res.json({status: true, data: {_id: usuario._id, nome: usuario.nome, email: usuario.email}});
			}else{
				res.json({status: false, data: 'E-mail e/ou Senha inválidos'});
			}
			
		});

	});

	app.post('/usuario', function (req, res){

		Usuario.findOne({email: req.body.email}, function (err, usuario){
			if(err)
				res.json({status: false, data: err.message});

			if(usuario){
				res.json({status: false, data: 'Este e-mail já está sendo utilizado'});
			}else{
				var usuario = new Usuario();

				usuario.nome  = req.body.nome;
				usuario.email = req.body.email;
				usuario.senha = sha1(req.body.senha);

				usuario.save(function(err, usuario) {
					if (err)
						res.json({status: false, data: err.message});

					res.json({status: true, data: {_id: usuario._id, nome: usuario.nome, email: usuario.email}});
				});
			}			
		});		

	});

	app.get('/usuario', function (req, res){

		Usuario.find(function (err, usuarios){
			if (err)
				res.json({status: false, data: err.message});

			res.json({status: true, data: usuarios});
		});

	});

	app.get('/usuario/:idUsuario', function (req, res){

		Usuario.findById(req.params.idUsuario, function (err, usuarios){
			if (err)
				res.json({status: false, data: err.message});

			res.json({status: true, data: usuarios});
		});

	});

	app.put('/usuario/:idUsuario', function (req, res){

		Usuario.findOne({email: req.body.email}, function (err, usuario){
			if(err)
				res.json({status: false, data: err.message});

			if(usuario && usuario._id != req.params.idUsuario){
				res.json({status: false, data: 'Este e-mail já está sendo utilizado'});
			}else{
				Usuario.findById(req.params.idUsuario, function (err, usuario){
					if (err)
			        	res.json({status: false, erro: err.message});

					usuario.nome = req.body.nome;
					usuario.email = req.body.email;

					//Atualizar todos os posts com este usuario
					//Busca os posts feitos pelo usuário atualizado
					Post.find()
					.where('usuario._id').equals(req.params.idUsuario)
					.exec(function (err, posts){
						if (err)
			        		res.json({status: false, erro: err.message});

			        	//Iterar os posts encontrados
			        	posts.forEach(function (post){
			        		//Atualizar o nome do post
			        		post.usuario.nome = usuario.nome;
							post.data = post.data;

							//Salvar o post
							post.save();
			        	});
			        	
					});

					//Atualizar todos os comentários feitos por este usuário
					//Primeiro pegue todos os posts
					Post.find(function (err, posts){
						if (err)
			        		res.json({status: false, erro: err.message});

			        	//Iterar todos os posts
			        	posts.forEach(function (post){
			        		
			        		//Pegar os comentarios desse post
			        		var comentarios = post.comentarios;

			        		//Iterar todos os comentários desse post
			        		comentarios.forEach(function (aux){
			        			//Caso o usuario do comentario seja o mesmo atualizado
			        			if(aux.usuario._id == req.params.idUsuario){

			        				/*
			        				Buscar o post pelo _id 
			        				(Somente assim é possivel atualizar um Embedded Doc - Objeto dentro de Objeto)
			        				*/	
			        				Post.findById(post._id, function (err, post){
			        					if (err)
			        						res.json({status: false, erro: err.message});

			        					//Pegar o comentário pelo _id verificado anteriormente
			        					var comentario = post.comentarios.id(aux._id);

			        					//Remover o comentário
			        					post.comentarios.id(aux._id).remove();

			        					//Alterar o nome do usuário no comentário e adiciona ao post mantendo a data
			        					comentario.usuario.nome = usuario.nome;
			        					post.comentarios.push(comentario);

										post.data = post.data;

										//Salvar o post
			        					post.save();
			        				});
			        			}			        			
			        		});

			        	});
			        	
					});

					usuario.save(function(err, usuario) {
						if (err)
							res.json({status: false, data: err.message});

						res.json({status: true, data: {_id: usuario._id, nome: usuario.nome, email: usuario.email}});
					});

				});	
			}

		});	

	});

	app.put('/senha/:idUsuario', function (req, res){

		Usuario.findById(req.params.idUsuario, function (err, usuario){

			if(err)
				res.json({status: false, data: err.message});

			if(sha1(req.body.senha) == usuario.senha){
				usuario.senha = sha1(req.body.nova);

				usuario.save(function (err){
					if(err)
						res.json({status: false, data: err.message});

					res.json({status: true, data: 'Senha atualizada'});
				});
			}else{
				res.json({status: false, data: 'Senha anterior incorreta'});
			}

		});

	});

	app.delete('/usuario/:idUsuario', function (req, res){
		Usuario.remove({
	      _id: req.params.idUsuario
	    }, function(err) {
	      if (err)
	        res.json({status: false, erro: err.message});

	      res.json({status: true});
	    });
	});

};