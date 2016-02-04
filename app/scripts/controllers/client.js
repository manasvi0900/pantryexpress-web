'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:ClientCtrl
 * @description
 * # ClientCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('ClientCtrl', function ($scope) {

    var currentIndex = 0;
    $scope.pages = [
      {
        name: 'Find Client',
        url: 'views/findclient.html'
      },
      {
        name: 'New Client',
        url: 'views/newclient.html'
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
