
// routes.js
    angular.module('routes', []).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/login");

     $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "./views/login.html",
            controller : 'LoginController'
        })
        .state("status", {
            url:"/status",
            templateUrl: "./views/status.html",
            controller : 'ProgressBarDemoCtrl'
        })
        .state("dashboard", {
            url:"/dashboard",
            templateUrl: "./views/dashboard.html",
            controller : 'dashboardCtrl'
        });
              
}]);
