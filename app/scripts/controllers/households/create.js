'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:HouseholdsCreateCtrl
 * @description
 * # HouseholdsCreateCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('HouseholdsCreateCtrl', function ($scope, api, ngDialog) {
    $scope.currentIndex = 0;
    $scope.pages = [
      {
        name: 'Household Information',
        url: 'views/households/create/householdcreateinfo.html'
      },
      {
        name: 'Household Members',
        url: 'views/households/create/householdmembers.html'
      },
      {
        name: 'Household Confirmation',
        url: 'views/households/create/householdconfirmation.html'
      },
    ];
    $scope.template = $scope.pages[$scope.currentIndex];

    $scope.goto = function (targetIndex){
      $scope.currentIndex = targetIndex;
      $scope.template = $scope.pages[$scope.currentIndex];
    };

    $scope.next = function (){
      $scope.currentIndex++;
      $scope.goto($scope.currentIndex);
    };

    $scope.previous = function (){
      $scope.currentIndex--;
      $scope.goto($scope.currentIndex);
    };
  });
