'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:HouseholdCtrl
 * @description
 * # HouseholdCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('HouseholdCtrl', function ($scope) {

    var currentIndex = 0;
    $scope.pages = [
      {
        name: 'Find Household',
        url: 'views/findhousehold.html'
      },
      {
        name: 'Edit Household',
        url: 'views/edithousehold.html'
      },
    ];
    $scope.template = $scope.pages[currentIndex];

    $scope.goto = function (targetIndex){
      currentIndex = targetIndex;
      $scope.template = $scope.pages[currentIndex];
    }
    $scope.next = function (){
      // TODO(Mark): Copy from Justin
      currentIndex++;
      $scope.goto(currentIndex);
    }

  });
