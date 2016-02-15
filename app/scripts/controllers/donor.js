'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:DonorCtrl
 * @description
 * # DonorCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('DonorCtrl', function ($scope) {
    var currentIndex = 0;
    $scope.pages = [
      {
        name: 'Find Donor',
        url: 'views/finddonor.html'
      },
      {
        name: 'New Donor',
        url: 'views/newdonor.html'
      },
      {
        name: 'New Donation',
        url: 'views/newdonation.html'
      },
      {
        name: 'View Donation',
        url: 'views/viewdonation.html'
      },
    ];
    $scope.template = $scope.pages[currentIndex];

    $scope.goto = function (targetIndex){
      currentIndex = targetIndex;
      $scope.template = $scope.pages[currentIndex];
    }
    $scope.next = function (){
      currentIndex++;
      $scope.goto(currentIndex);
    }

  });

