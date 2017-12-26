
  angular.module('ProgressBarDemoCtrl', []).controller('ProgressBarDemoCtrl', function($scope,$state,$timeout,LoginService) {
   var vm = this;
    $scope.logout=function(){
		LoginService.logout()
		window.location = window.location.origin;
		//window.localStorage.clear();
		//$state.transitionTo('login');
    }
   $scope.title1="Ready To Go";
     $timeout( function(){
            vm.percentComplete = 100;
     }, 500 );
   $scope.time = 0;
      var timer = function() {
            if( $scope.time < 500 ) {
                $scope.time += 200;
                vm.percentComplete = 45;
            }
        }
		    $timeout(timer, 200);
            vm.percentComplete = 15;

    vm.random = function () {
        vm.percentComplete = Math.floor((Math.random() * 100) + 1);
    };

  });
