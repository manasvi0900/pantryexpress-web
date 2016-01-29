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
    var templates = [
      {
        url: 'views/pantryinfo.html'
      },
      {
        url: 'views/directorinfo.html'
      },
      {
        url: 'views/signupconfirmation.html'
      },
    ];
    $scope.template = templates[currentIndex];

    $scope.next = function (){
      // TODO(Justin): Check overflow of index
      currentIndex++;
      $scope.template = templates[currentIndex];
    }

  });
