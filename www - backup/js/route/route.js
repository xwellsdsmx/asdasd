app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: 'templates/usuario/login.html',
		controller: 'usuarioController'
	})
	.state('cadastro', {
		url: '/cadastro',
		templateUrl: 'templates/usuario/cadastro.html',
		controller: 'usuarioController'
	})
	.state('posts', {
		url: '/posts',
		templateUrl: 'templates/post/posts.html',
		controller: 'postController'
	})
	.state('perfil', {
		url: '/perfil',
		templateUrl: 'templates/usuario/perfil.html',
		controller: 'usuarioController'
	});

	$httpProvider.interceptors.push(function($q, $rootScope){
		return {
      		// O 'request' ocorre sempre que uma requisição http for iniciada
			'request': function(config) {		

				var canceler = $q.defer();

			  /*config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';			    			    
		    if(config.url.indexOf('api/') > 0){

		    	$rootScope.$broadcast('network:verify');

		    	if(sessionStorage.iConnOnline == 1){
		    		$rootScope.$broadcast('loading:show');
		    	}else{
		    		$rootScope.$broadcast('connection:offline');
					config.timeout = canceler.promise;
		    		canceler.resolve();
		    	}
		    	
		    }*/

		      return config;
		    },
		    // optional method
		   'requestError': function(rejection) {
		      // do something on error
		      return $q.reject(rejection);
		    },
		    // optional method
		    'response': function(response) {
		      // do something on success
		      /*if(response.config.url.indexOf('api/') > 0){
		      	//$rootScope.$broadcast('loading:hide');
		      	/*if(!response.data.status){
			    	app.autorizacao(response.data);
		      	}
			  	}*/

		      return response;
		    },

		   'responseError': function (rejection) {

		   		/*if(rejection.config.url.indexOf('api/') > 0){
			      //$rootScope.$broadcast('loading:hide');
					}*/
		   		//tratar todos os erros de requisição aqui
		      
		      return $q.reject(rejection);
		    }
	  	};
  	});

	if(typeof localStorage.loginPost != 'undefined'){
		$urlRouterProvider.otherwise('/posts');
	}else{
		$urlRouterProvider.otherwise('/login');
	}
	

}]);