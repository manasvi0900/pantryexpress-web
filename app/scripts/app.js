'use strict';

/**
 * @ngdoc overview
 * @name pantyexpressApp
 * @description
 * # pantyexpressApp
 *
 * Main module of the application.
 */
angular
  .module('pantyexpressApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
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
      .when('/pantryinfo', {
        templateUrl: 'views/pantryinfo.html',
        controller: 'PantryinfoCtrl',
        controllerAs: 'pantryinfo'
      })
      .when('/donor', {
        templateUrl: 'views/donor.html',
        controller: 'DonorCtrl',
        controllerAs: 'donor'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
