'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:HouseholdCtrl
 * @description
 * # HouseholdCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('HouseholdCtrl', function ($scope, $rootScope, $location, $routeParams, api) {
    $scope.setview = function(name)
    {
      if(name === 'edit')
      {
        $scope.template = {
          name: 'Edit Household',
          url: 'views/households/edithousehold.html',
          visible: true
        };
      }
      if(name === 'find')
      {
        $scope.template = {
          name: 'Find Household',
          url: 'views/households/findhousehold.html',
          visible: true
        };
      }
      if(name === 'move')
      {
        $scope.template = {
          name: 'Move Household Member',
          url: 'views/households/movehousehold.html',
          visible: true
        };
      }
      if(name === 'editmember')
      {
        $scope.template = {
          name: 'Edit Household Member',
          url: 'views/households/householdmemberinfo.html',
          visible: true
        };
      }
      if(name === 'newservice')
      {
        $scope.template = {
          name: 'New Service',
          url: 'views/households/newservice.html',
          visible: true
        };
      }
    }
    var viewname = ($routeParams.householdview);
    // console.log('HouseholdCtrl:' + viewname);
    var currentIndex = 0;
    $scope.pages = [
      {
        name: 'Find Household',
        url: 'views/households/findhousehold.html',
        visible: true
      },
      {
        name: 'Edit household',
        url: 'views/households/edithousehold.html',
        visible: true
      },
      {
        name: 'New Household Member',
        url: 'views/households/newhouseholdmember.html',
        visible: true
      }
    ];

    $scope.newHousehold= function () {

      $location.path('views/households/newhousehold.htmlt');

    };

    $scope.req = {
      households: []
    };
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


    $scope.getHousehold = function () {
      // Write model data for request
      console.log('HouseholdsGetRequest', $scope.req);

      // Call get household operation via API service
      console.log("Selected Pantry ID: ", $rootScope.selectedPantry.id  );
      api.getPantriesByPantryIdHouseholdsByHouseholdId({ householdId: $rootScope.selectedHousehold.id, pantryId: $rootScope.selectedPantry.id }).getHousehold()
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
