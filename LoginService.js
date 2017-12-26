
angular.module('LoginService', []).factory('LoginService', ['$http', function($http) {
  var admin = 'admin';
    var pass = 'admin';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
		  if(username === admin && password === admin){
			  window.localStorage.setItem('username', username)
			  window.localStorage.setItem('password', password)
			  isAuthenticated = true;
		  } else {
			isAuthenticated = false;
		  }
        
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      },
	  logout: function(){
		  window.localStorage.clear();
		  isAuthenticated = false;
		  return true;
	  }
    };
}]);