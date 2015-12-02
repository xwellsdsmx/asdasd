app.controller('postController', ['$scope', '$ionicPopover', '$ionicPopup', '$ionicNavBarDelegate', 'postF', 'usuarioF', 'comentarioF', function($scope, $ionicPopover, $ionicPopup, $ionicNavBarDelegate, postF, usuarioF, comentarioF){
	
	$ionicNavBarDelegate.showBackButton(false);

	$scope.editarComentario = {};

	$ionicPopover.fromTemplateUrl('templates/popover/comentario.html', {
	    scope: $scope
	}).then(function(popover) {
	    $scope.popoverC = popover;
	});

	$ionicPopover.fromTemplateUrl('templates/popover/post.html', {
	    scope: $scope
	}).then(function(popover) {
	    $scope.popoverP = popover;
	});

	$scope.$on('popoverC.hidden', function() {
	    sessionStorage.removeItem('popoverComentario');
	});

	$scope.$on('popoverP.hidden', function() {
	    sessionStorage.removeItem('popoverPost');
	});

	$scope.novoPost = function(post){
		$scope.postagem = undefined;
	};

	$scope.mostrarComentario = function(index){
		$scope.mostrandoComentario[index] = !$scope.mostrandoComentario[index];
	};

	$scope.getPosts = function(){
		postF.getAll().then(function (res){
			if(res.data.status){
				var posts = res.data.data;
				$scope.posts = posts;
				$scope.mostrandoComentario = [];
				angular.forEach(posts, function (v, i){
					$scope.mostrandoComentario.push(v._id);
				});
				$scope.postagem = {};
				$scope.$broadcast('scroll.refreshComplete');
			}else{
				console.log(res.data.data);
			}
		}, function (err){
			console.log(err);
		});
	};

	$scope.postPost = function(post){
		$scope.postagem = {};

		if(post.descricao !== undefined){
			if(!post.descricao.replace(/^\s+|\s+$/g,"") == ''){
				var usuario = usuarioF.getLocal();

				var post = {
					idUsuario: usuario._id,
					descricao: post.descricao
				};

				postF.post(post).then(function (res){
					if(res.data.status){
						$scope.getPosts();
					}else{
						console.log(res.data.data);
					}
				}, function (err){
					console.log(err);
				});
			}else{
				$scope.postagem.erro = 'A descrição do post não pode ficar em branco';
			}
		}else{
			$scope.postagem.erro = 'A descrição do post não pode ficar em branco';
		}
		
	};

	$scope.putPost = function(){
		$scope.popoverP.hide();
		$scope.data = JSON.parse(sessionStorage.editarPost);

		$ionicPopup.show({
	    template: '<textarea rows="5" ng-model="data.descricao"></textarea>',
	    title: 'Editar Post',
	    scope: $scope,
	    buttons: [{
		    text: 'Cancelar',
		    type: 'button-assertive',
		    onTap: function(e) {
		    	$scope.data.post = '';
		      return $scope.data;
		    }
		  }, {
		    text: 'OK',
		    type: 'button-positive',
		    onTap: function(e) {
		    	$scope.data.post = '';
		      return $scope.data;
		    }
		  }]
	  }).then(function (post){
	  	if(!post.descricao.replace(/^\s+|\s+$/g,"") == ''){
		  	postF.put(post).then(function (res){
		  		$scope.getPosts();
		  	});
		  }
	  });
	};

	$scope.deletePost = function(){
		$scope.popoverP.hide();

		var post = JSON.parse(sessionStorage.editarPost);
		
		postF.delete(post).then(function (res){
			$scope.getPosts();
		});
	};

	$scope.postComentario = function(post){
		$scope.data = post;

		$ionicPopup.show({
	    template: '<textarea rows="5" ng-model="data.comentario"></textarea>',
	    title: 'Novo Comentário',
	    scope: $scope,
	    buttons: [{
		    text: 'Cancelar',
		    type: 'button-assertive',
		    onTap: function(e) {
		    	$scope.data.comentario = '';
		      return $scope.data;
		    }
		  }, {
		    text: 'OK',
		    type: 'button-positive',
		    onTap: function(e) {
		      return $scope.data;
		    }
		  }]
	  }).then(function (post){
	  	var comentario = {
	  		comentario: post.comentario,
	  		usuario: JSON.parse(localStorage.loginPost)
	  	};
	  	if(!post.comentario.replace(/^\s+|\s+$/g,"") == ''){
				comentarioF.post(comentario, post).then(function (res){
					if(res.data.status){
						$scope.getPosts();
					}else{
						console.log(res.data.data);
					}
				}, function (err){
					console.log(err);
				});
			}
	  });
	};

	$scope.putComentario = function(comentario, post){
		$scope.popoverC.hide();	

		$scope.data = JSON.parse(sessionStorage.editarComentario);
	
		$ionicPopup.show({
	    template: '<textarea rows="5" ng-model="data.comentario.comentario"></textarea>',
	    title: 'Editar Comentário',
	    scope: $scope,
	    buttons: [{
		    text: 'Cancelar',
		    type: 'button-assertive',
		    onTap: function(e) {
		    	$scope.data.comentario.comentario = '';
		      return $scope.data;
		    }
		  }, {
		    text: 'OK',
		    type: 'button-positive',
		    onTap: function(e) {
		      return $scope.data;
		    }
		  }]
	  }).then(function (res){
	  	if(!res.comentario.comentario.replace(/^\s+|\s+$/g,"") == ''){
		  	var post = {
		  		_id: res.index
		  	};

		  	var comentario = res.comentario;

		  	comentarioF.put(comentario, post).then(function (res){
		  		$scope.getPosts();
		  	});
		  }
	  });
	};

	$scope.deleteComentario = function(){
		$scope.popoverC.hide();

		var comentario = JSON.parse(sessionStorage.editarComentario);
		
		comentarioF.delete(comentario.comentario, {_id: comentario.index}).then(function (res){
			$scope.getPosts();
		});
		
	};

	$scope.popoverComentario = function($event, comentario, index){

		var usuario = JSON.parse(localStorage.loginPost);

		if(usuario._id == comentario.usuario._id){
			sessionStorage.editarComentario = JSON.stringify({index: index, comentario: comentario});
			$scope.popoverC.show($event);
		}
		
	};

	$scope.popoverPost = function($event, post){

		var usuario = JSON.parse(localStorage.loginPost);

		if(usuario._id == post.usuario._id){
			sessionStorage.editarPost = JSON.stringify(post);
			$scope.popoverP.show($event);
		}

	};

}]);