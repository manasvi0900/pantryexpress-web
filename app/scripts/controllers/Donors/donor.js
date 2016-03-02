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
        name: 'Find donors',
        url: 'views/donors/finddonor.html'
      },
      {
        name: 'New donors',
        url: 'views/donors/newdonor.html'
      },
      {
        name: 'New Donation',
        url: 'views/donors/newdonation.html'
      },
      {
        name: 'View Donation',
        url: 'views/donors/viewdonation.html'
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

