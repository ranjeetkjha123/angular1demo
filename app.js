 angular.module('app', ['ux-aspects','ui.router','routes','LoginController','ProgressBarDemoCtrl',
 'dashboardCtrl','LoginService' ]).
 run(function($rootScope, $location, $state, LoginService) {
    
    
      $rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
		  if(toState.url != '/login'){
				if(!window.localStorage.getItem('username') && !window.localStorage.getItem('password')){
					window.location = window.location.origin
			 //$state.go('login');
			}
		  }
		  
		});
		if(!window.localStorage.getItem('username') && !window.localStorage.getItem('password')){
			return $state.transitionTo('login');
		}
  });

angular.bootstrap(document, ['app']);