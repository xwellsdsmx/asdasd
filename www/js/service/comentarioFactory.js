app.factory('comentarioF', ['$http', function($http){
	return {
		post: function(comentario, post){
			return $http.post(app.url + '/post/' + post._id + '/comentario', comentario);
		},
		put: function(comentario, post){
			return $http.put(app.url + '/post/' + post._id + '/comentario/' + comentario._id, comentario);
		},
		delete: function(comentario, post){
			return $http.delete(app.url + '/post/' + post._id + '/comentario/' + comentario._id);
		}
	};
}])