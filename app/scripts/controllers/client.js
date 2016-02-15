'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:ClientCtrl
 * @description
 * # ClientCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('ClientCtrl', function ($scope, api) {
    console.log(api.getPantries());

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

    api.getPantriesByPantryId({ pantryId: '73700642-ddb0-4446-ab53-4a82310f8d13'}).then(function (data){
      $scope.pages[0].name = data;
      console.log(data, 'asdfs');
    },function(err){
      console.log(err, 'didntwork')
    });

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
