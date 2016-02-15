'use strict';

/**
 * @ngdoc overview
 * @name pantyexpressApp
 * @description
 * # pantyexpressApp
 *
 * Main module of the application.
 */

var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
  // Initialize a new promise
  console.log("check ");
  var deferred = $q.defer();
  // Make an AJAX call to check if the user is logged in
  //$http.get('/loggedin').success(function (user) {
    // Authenticated
  //var user = '0';
    if ($rootScope.user!==null&&$rootScope.user !== '0') {
      console.log("auth ");
      deferred.resolve();
    }
    // Not Authenticated
    else {
      console.log("no auth ");
      $rootScope.message = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    }
  //});
  return deferred.promise;
};
angular
  .module('pantyexpressApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'peClient'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/donor', {
        templateUrl: 'views/donor.html',
        controller: 'DonorCtrl',
        controllerAs: 'donor',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/household', {
        templateUrl: 'views/household.html',
        controller: 'HouseholdCtrl',
        controllerAs: 'household'
      })
      .when('/service', {
        templateUrl: 'views/service.html',
        controller: 'ServiceCtrl',
        controllerAs: 'service'
      })
      .when('/client', {
        templateUrl: 'views/client.html',
        controller: 'ClientCtrl',
        controllerAs: 'client'
      })
      .when('/movehousehold', {
        templateUrl: 'views/movehousehold.html',
        controller: 'MovehouseholdCtrl',
        controllerAs: 'movehousehold'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
