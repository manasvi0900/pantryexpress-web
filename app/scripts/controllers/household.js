'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:HouseholdCtrl
 * @description
 * # HouseholdCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('HouseholdCtrl', function ($scope,$routeParams) {

    $scope.setview = function(name)
    {
      if(name === 'edit')
      {
        $scope.template = {
          name: 'Edit Household',
          url: 'views/edithousehold.html',
          visible: true
        };
      }
    }
    var viewname = ($routeParams.householdview || "");
    console.log("HouseholdCtrl:"+viewname);
    var currentIndex = 0;
    $scope.pages = [
      {
        name: 'Find Household',
        url: 'views/findhousehold.html',
        visible: true
      },
      {
        name: 'Household Management',
        url: 'views/newhousehold.html',
        visible: true
      }
    ];
    $scope.template = $scope.pages[currentIndex];

    $scope.setview(viewname);
    $scope.goto = function (targetIndex){
      currentIndex = targetIndex;
      $scope.template = $scope.pages[currentIndex];
    }
    $scope.next = function (){
      currentIndex++;
      $scope.goto(currentIndex);
    }

  });
    /*** old logic for pushing
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
     ****/
