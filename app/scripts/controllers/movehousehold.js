'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:MovehouseholdCtrl
 * @description
 * # MovehouseholdCtrl
 * Controller of the pantyexpressApp
 */

angular.module('pantyexpressApp')
  .controller('MovehouseholdCtrl', function ($scope,$location) {

    var currentIndex = 1;
    $scope.pages = [
      {
        name: 'Find Household',
        url: 'views/findhousehold.html',
        visible: true
      },
      {
        name: 'Move Household',
        url: 'views/movehouseholdcode.html',
        visible: true
      },
    ];
    $scope.template = $scope.pages[currentIndex];

    $scope.goto = function (targetIndex){
      currentIndex = targetIndex;
      if(targetIndex === 0)
      {
        $location.path( '/household' );
      }
      $scope.template = $scope.pages[currentIndex];

    }
    $scope.next = function (){
      console.log("movehousehold");
      // TODO(Mark): Copy from Justin
      currentIndex++;
      $scope.goto(currentIndex);
    }

  });
