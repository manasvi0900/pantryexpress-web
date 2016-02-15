'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('LoginCtrl', function ($scope, $location,$rootScope) {

    $scope.login = function (foo){
      console.log("here");
      $rootScope.user = 'Joe';
      $location.url('/');
    }
  });
