app.controller('usuarioController', ['$scope', '$state', '$ionicPopup', '$ionicNavBarDelegate', 'usuarioF', function($scope, $state, $ionicPopup, $ionicNavBarDelegate, usuarioF){
	
	$scope.initPerfil = function(){
		$ionicNavBarDelegate.showBackButton(true);
	};

	$scope.usuario = (localStorage.loginPost !== undefined) ? JSON.parse(localStorage.loginPost) : {};

	$scope.sair = function(){
		localStorage.removeItem('loginPost');
		$state.go('login');
	};

	$scope.login = function(usuario){
		usuarioF.login(usuario).then(function (res){
			if(res.data.status){
				localStorage.loginPost = JSON.stringify(res.data.data);
				$state.go('posts');
			}else{
				alert(res.data.data);
			}
		}, function (err){
			console.log(err);
		});
	};

	$scope.inserirUsuario = function(usuario){
		usuarioF.post(usuario).then(function (res){
			if(res.data.status){
				localStorage.loginPost = JSON.stringify(res.data.data);
				$state.go('posts');
			}else{
				usuario.erro = res.data.data;
			}
		}, function (err){
			console.log(err);
		});
	};

	$scope.popupPerfil = function(){
		$scope.usuarioE = JSON.parse(localStorage.loginPost);

		$ionicPopup.show({
		    templateUrl: 'templates/usuario/alterar/usuario.html',
		    cssClass: 'popup-perfil',
		    title: 'Alterar Perfil',
		    scope: $scope,
	    	buttons: [{
		    text: 'Cancelar',
		    type: 'button-assertive',
		    onTap: function(e) {
		      return undefined;
		    }
		}, {
		    text: 'OK',
		    type: 'button-positive',
		    onTap: function(e) {
		    	var usuario = $scope.usuarioE, nome = false, email = false;

		    	$scope.usuarioE.erro = undefined;

		    	if(usuario.nome !== undefined){
		    		if(usuario.nome.replace(/^\s+|\s+$/g,"") != ''){
		    			nome = true;
		    		}
		    	}

		    	if(usuario.email !== undefined){
		    		if(usuario.email.replace(/^\s+|\s+$/g,"") != ''){
		    			email = true;
		    		}
		    	}
		    	
		    	if (!nome || !email) {
		      		e.preventDefault();
					$scope.usuarioE.erro = 'Campos faltando ou preenchidos incorretamente';
		      	}else{
		      		return $scope.usuarioE;
		      	}		      
		    }
		  }]
		}).then(function (usuario){
			usuarioF.put(usuario).then(function (res){
				if(res.data.status){
					localStorage.loginPost = JSON.stringify(res.data.data);
					$scope.usuario = res.data.data;
					$state.go('posts');
				}else{
					alert(res.data.data);
				}
				
			});				
		});
	};

	$scope.popupSenha = function(){
		$scope.usuarioE = JSON.parse(localStorage.loginPost);

		$ionicPopup.show({
		    templateUrl: 'templates/usuario/alterar/senha.html',
		    cssClass: 'popup-perfil',
		    title: 'Alterar Senha',
		    scope: $scope,
	    	buttons: [{
		    text: 'Cancelar',
		    type: 'button-assertive',
		    onTap: function(e) {
		      return undefined;
		    }
		}, {
		    text: 'OK',
		    type: 'button-positive',
		    onTap: function(e) {
		    	var usuario = $scope.usuarioE, senha = false, nova = false, confirmar = false;

		    	$scope.usuarioE.erro = undefined;

		    	if(usuario.senha !== undefined){
		    		if(usuario.senha.replace(/^\s+|\s+$/g,"") != ''){
		    			senha = true;
		    		}
		    	}

		    	if(usuario.nova !== undefined){
		    		if(usuario.nova.replace(/^\s+|\s+$/g,"") != ''){
		    			nova = true;
		    		}
		    	}

		    	if(usuario.confirmar !== undefined){
		    		if(usuario.confirmar.replace(/^\s+|\s+$/g,"") != ''){
		    			confirmar = true;
		    		}
		    	}

		    	if(usuario.confirmar !== undefined && usuario.nova !== undefined){
		    		if(usuario.confirmar != usuario.nova){
		    			confirmar = false;
		    			nova = false;
		    			$scope.usuarioE.erro = 'A confirmação de nova senha e nova senha devem ser iguais';
		    		}
		    	}
		    	
		    	if (!senha || !nova || !confirmar) {
		      		e.preventDefault();
		      		if($scope.usuarioE.erro == '' || $scope.usuarioE.erro === undefined){
		      			$scope.usuarioE.erro = 'Campos faltando ou preenchidos incorretamente';
		      		}					
		      	}else{
		      		return $scope.usuarioE;
		      	}		      
		    }
		  }]
		}).then(function (usuario){
			usuarioF.putSenha(usuario).then(function (res){
				alert(res.data.data);
				$state.go('posts');
			});		
		});
	};

}]);