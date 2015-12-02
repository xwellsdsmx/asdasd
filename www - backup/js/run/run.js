app.run(['$ionicPlatform', '$location', '$ionicHistory', '$cordovaStatusbar', function ($ionicPlatform, $location, $ionicHistory, $cordovaStatusbar) {


  $ionicPlatform.registerBackButtonAction(function (event) {

    var tela = $location.path();
    var telas = ['/login', '/posts'];

    if(telas.indexOf(tela) >= 0){
      ionic.Platform.exitApp();
    }else{
      $ionicHistory.goBack();
    }
    
     
  }, 100);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
      $cordovaStatusbar.styleHex("#387ef5");
    }
  });
}]);