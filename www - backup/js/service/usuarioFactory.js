app.factory('usuarioF', ['$http', function($http){
	return{
		login: function(usuario){
			return $http.post(app.url + '/login', usuario);
		},
		post: function(usuario){
			return $http.post(app.url + '/usuario', usuario);
		},
		put: function(usuario){
			return $http.put(app.url + '/usuario/' + usuario._id, usuario);
		},
		putSenha: function(usuario){
			return $http.put(app.url + '/senha/' + usuario._id, usuario);
		},
		getLocal: function(){
			return JSON.parse(localStorage.loginPost);
		}
	};
}])