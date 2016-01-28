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
      //PantryManagement
      .when('/', {
        templateUrl: 'views/AddFoodPantry.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/AddFoodPantry', {
        templateUrl: 'views/AddFoodPantry.html'
      })
      .when('/DirectorInformation', {
        templateUrl: 'views/DirectorInformation.html'
      })
      .when('/PaymentMethod', {
        templateUrl: 'views/PaymentMethod.html'
      })
      .when('/Confirmation', {
        templateUrl: 'views/Confirmation.html'
       })
      //Donor Management
      .when('/FindDonor', {
        templateUrl: 'views/FindDonor.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



