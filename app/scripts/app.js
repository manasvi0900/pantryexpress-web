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
    if ($rootScope.user!==undefined&&$rootScope.user.name!==null)
    {
      deferred.resolve();
    }
    // Not Authenticated
    else {
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
    'peClient',
    'ngDialog'
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
      .when('/donors', {
        templateUrl: 'views/donors/donor.html',
        controller: 'DonorCtrl',
        controllerAs: 'donor',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/households/create', {
        templateUrl: 'views/households/create/create.html',
        controller: 'HouseholdsCreateCtrl',
        controllerAs: 'households/create'
      })
      .when('/households', {
        templateUrl: 'views/households/household.html',
        controller: 'HouseholdCtrl',
        controllerAs: 'household',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/households/:householdview', {
        templateUrl: 'views/households/household.html',
        controller: 'HouseholdCtrl',
        controllerAs: 'household'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
