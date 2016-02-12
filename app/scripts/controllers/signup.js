'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('SignupCtrl', function ($scope) {
    var currentIndex = 0;
    $scope.pages = [
      {
        name: 'Pantry Information',
        url: 'views/pantryinfo.html'
      },
      {
        name: 'Administrator Information',
        url: 'views/administratorinfo.html'
      },
      {
        name: 'Signup Confirmation',
        url: 'views/signupconfirmation.html'
      },
    ];
    $scope.template = $scope.pages[currentIndex];

    $scope.goto = function (targetIndex){
      currentIndex = targetIndex;
      $scope.template = $scope.pages[currentIndex];
    }

    $scope.next = function (){
      // TODO(Justin): Check overflow of index
      currentIndex++;
      $scope.goto(currentIndex);
    }

  });
