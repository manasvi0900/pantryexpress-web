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
    
    // FOR TESTING ONLY - DELETE THIS LINE AND THE FOLLOWING OBJECT
    $rootScope.selectedHousehold = {
      id: '02cc1d96-2ffe-49b5-9f42-5c2ec2d3cc7a'
    }
    
    $scope.setview = function(name)
    {
      if(name === 'edit')
      {
        $scope.template = $scope.templates['edit'];
        $scope.template.init();
      }
      if(name === 'find')
      {
        $scope.template = $scope.templates['find'];
        $scope.template.init();
      }
      if(name === 'move')
      {
        $scope.template = $scope.templates['move'];
        $scope.template.init();
      }
      if(name === 'editmember')
      {
        $scope.template = $scope.templates['editmember'];
        $scope.template.init();
      }
      if(name === 'newservice')
      {
        $scope.template = $scope.templates['newservice'];
        $scope.template.init();
      }
      if(name === null)
      {
        $scope.template = $scope.templates['find'];
        $scope.template.init();
      }
    }
    var viewname = ($routeParams.householdview);
    // console.log('HouseholdCtrl:' + viewname);
    var currentIndex = 0;
    
    // Define various page templates within a templates object map
    $scope.templates = {};
    $scope.templates['edit'] = {
      name: 'Edit Household',
      url: 'views/households/edithousehold.html',
      visible: true,
      init: function() {
        if ($rootScope.selectedHousehold && $rootScope.selectedHousehold.id) {
          console.log("Selected Household ID: ", $rootScope.selectedHousehold.id);
          getHousehold();
        } else {
          console.log("Selected Household ID: Undefined");
        }
      }
    };
    $scope.templates['find'] = {
      name: 'Find Household',
      url: 'views/households/findhousehold.html',
      visible: true,
      init: function() {
        console.log("Placeholder init call here!");
      }
    };
    $scope.templates['move'] = {
      name: 'Move Household Member',
      url: 'views/households/movehousehold.html',
      visible: true,
      init: function() {}
    };
    $scope.templates['editmember'] = {
      name: 'Edit Household Member',
      url: 'views/households/householdmemberinfo.html',
      visible: true,
      init: function() {

      }
    };
    $scope.templates['newservice'] = {
      name: 'New Service',
      url: 'views/households/newservice.html',
      visible: true,
      init: function() {}
    };
    
    $scope.pages = [
        $scope.templates['find'],
        $scope.templates['edit'],
        $scope.templates['editmember']
    ];

    $scope.template = $scope.pages[currentIndex];

    $scope.newHousehold= function () {
      $location.path('views/households/newhousehold.htmlt');
    };
    
    $scope.setview(viewname);
    $scope.goto = function (targetIndex){
      currentIndex = targetIndex;
      $scope.template = $scope.pages[currentIndex];
      $scope.template.init();
    }
    $scope.next = function (){
      currentIndex++;
      $scope.goto(currentIndex);
      $scope.template.init();
    }
    
    $scope.household = {};

    function getHousehold() {
      // Call get household operation via API service
      console.log("Selected Household ID: ", $rootScope.selectedHousehold.id );
      console.log("Selected Pantry ID: ", $rootScope.selectedPantry.id  );
      api.getPantriesByPantryIdHouseholdsByHouseholdId({ householdId: $rootScope.selectedHousehold.id, pantryId: $rootScope.selectedPantry.id }).then(function (data){
      $scope.household = data;
      console.log('Household: ', $scope.household);

      },function(err){
        console.error('HouseholdsGetRequest', err);
        // TODO: Add error handling here
      });
    }

  });
