
 angular.module('LoginController', []).controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "EnterpriseApplication";
    if(window.localStorage.getItem('username') && window.localStorage.getItem('password')){
		$state.transitionTo('status');

	}
    $scope.formSubmit = function() {
      if(LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('status');
      } else {
        $scope.error = "Incorrect username/password !";
      }   
    };
    
  });