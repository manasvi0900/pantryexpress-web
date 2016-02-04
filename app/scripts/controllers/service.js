'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:ServiceCtrl
 * @description
 * # ServiceCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('ServiceCtrl', function ($scope,$location) {

    var currentIndex = 1;
    $scope.pages = [
      {
        name: 'Find Household',
        url: 'views/household.html'
      },
      {
         name: 'New Service',
        url: 'views/newservice.html'
      },
    ];
    $scope.template = $scope.pages[currentIndex];

    $scope.goto = function (targetIndex){
      if(targetIndex == 0)
      {
        $location.path( '/household' );
      }
      else
      {
      currentIndex = targetIndex;
      $scope.template = $scope.pages[currentIndex];
      }
    }
    $scope.next = function (){
      // TODO(Mark): Copy from Justin
      currentIndex++;
      $scope.goto(currentIndex);
    }

  });


