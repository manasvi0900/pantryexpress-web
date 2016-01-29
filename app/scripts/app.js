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
        templateUrl: 'Modules/Pantry/views/AddFoodPantry.html'
      })
      .when('/AddFoodPantry', {
        templateUrl: 'Modules/Modules/Pantry/views/AddFoodPantry.html'
      })
      .when('/DirectorInformation', {
        templateUrl: 'Modules/Pantry/views/DirectorInformation.html'
      })
      .when('/PaymentMethod', {
        templateUrl: 'Modules/Pantry/views/PaymentMethod.html'
      })
      .when('/Confirmation', {
        templateUrl: 'Modules/Pantry/views/Confirmation.html'
       })
      //Donor Management
      .when('/FindDonor', {
        templateUrl: 'Modules/Donor/views/FindDonor.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



