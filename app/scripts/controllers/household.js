'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:HouseholdCtrl
 * @description
 * # HouseholdCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('HouseholdCtrl', function ($scope,$location) {

    var currentIndex = 0;
    $scope.pages = [
      {
        name: 'Find Household',
        url: 'views/findhousehold.html',
        visible: true
      },
      {
        name: 'New Household',
        url: 'views/newhousehold.html',
        visible: true
      },
      {
        name: 'Edit Household',
        url: 'views/edithousehold.html',
        visible: true
      },
    ];
    $scope.template = $scope.pages[currentIndex];

    $scope.goto = function (targetIndex){
      currentIndex = targetIndex;
      if(targetIndex === 3)
      {
        $location.path( '/service' );
      }
      if(targetIndex === 2)
      {
        var addme = {
          name: 'New Service',
          url: 'views/edithousehold.html'
        };

        $scope.pages.push(addme);
      }
      if(targetIndex<2&&targetIndex.count>=2)
      {
        $scope.pages.pop();//remove last item
      }
      $scope.template = $scope.pages[currentIndex];

    }
    $scope.next = function (){
      if(currentIndex<$scope.pages.length)
      {
        currentIndex++;

      $scope.goto(currentIndex);
      }
    }

  });
