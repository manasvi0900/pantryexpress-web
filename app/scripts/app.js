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
  var deferred = $q.defer();
    if ($rootScope.user!==undefined&&$rootScope.user.name!=null)
    {
      console.log("auth ");

      deferred.resolve();
    }
    // Not Authenticated
    else {
      console.log("no auth ");
      deferred.reject();
      $location.url('/login');
    }
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
        controllerAs: 'signup',
        resolve: {
          loggedin: checkLoggedin
        }
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
        controllerAs: 'household',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/service', {
        templateUrl: 'views/service.html',
        controller: 'ServiceCtrl',
        controllerAs: 'service',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/client', {
        templateUrl: 'views/client.html',
        controller: 'ClientCtrl',
        controllerAs: 'client',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
