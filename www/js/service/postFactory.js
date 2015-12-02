app.factory('postF', ['$http', function($http){
	return {
		getAll: function(){
			return $http.get(app.url + '/post');
		},
		post: function(post){
			return $http.post(app.url + '/post', post);
		},
		put: function(post){
			return $http.put(app.url + '/post/' + post._id, post);
		},
		delete: function(post){
			return $http.delete(app.url + '/post/' + post._id);
		}
	};
}])