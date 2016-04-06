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
        // Check if a household was previously selected; If not, redirect to find page
        if (!$rootScope.selectedHousehold || !$rootScope.selectedHousehold.householdId || !$rootScope.selectedHousehold.householdId == "") {
          $location.url('/households/find');
        }

        if ($rootScope.selectedHousehold && $rootScope.selectedHousehold.householdId) {
          console.log("Selected Household ID: ", $rootScope.selectedHousehold.householdId);
          getHousehold();
        } else {
          console.log("Selected Household ID: Undefined");
        }
        if ($rootScope.selectedHousehold && $rootScope.selectedHousehold.householdId) {
          getHouseholdMembers();
        }
      }
    };
    $scope.templates['find'] = {
      name: 'Find Household',
      url: 'views/households/findhousehold.html',
      visible: true,
      init: function() {

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
      $location.path('views/households/newhousehold.html');
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


    $scope.householdsFilter = {};
    $scope.household = {};
    $scope.households = [];

    $scope.findHouseholds = function (){
      console.log("HouseholdsFilterCriteria: ", $scope.householdsFilter);
      listHouseholds();
    };


    function getHousehold() {
      // Call get household operation via API service
      console.log("HouseholdsGet Household ID: ", $rootScope.selectedHousehold.householdId );
      console.log("HouseholdsGet Pantry ID: ", $rootScope.selectedPantry.id  );
      api.getPantriesByPantryIdHouseholdsByHouseholdId({ householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id }).then(function (data){
      $scope.household = data;
      console.log('HouseholdsGet Response: ', $scope.household);

      },function(err){
        console.error('HouseholdsGet Error', err);
        // TODO: Add error handling here
      });
    }

    function listHouseholds() {
      // Call list households operation via API service
      console.log("HouseholdsList Pantry ID: ", $rootScope.selectedPantry.id );
      api.getPantriesByPantryIdHouseholds({ pantryId: $rootScope.selectedPantry.id }).then(function (data){
        $scope.households = data.items;
        console.log('HouseholdsList Response: ', $scope.households);
      }, function(err){
        console.error('HouseholdsList Error', err);
        // TODO: Add error handling here
      });
    }

    $scope.setSelectedHousehold = function(household) {
      $rootScope.selectedHousehold = household;
      console.log("Selected Household updated to: ", household.householdId);
    };

    $scope.householdMembers = [];

    function getHouseholdMembers() {
      //call get householdMember operation via API service
      console.log("HouseholdMembersList Household ID: ", $rootScope.selectedHousehold.householdId );
      console.log("HouseholdMembersList Pantry ID: ", $rootScope.selectedPantry.id  );
      api.getPantriesByPantryIdHouseholdsByHouseholdIdMembers({ householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id }).then(function (data) {
        $scope.householdMembers = data.items;
        console.log('HouseholdMembersList Response: ', $scope.householdMembers);

      },function(err){
        console.error('HouseholdMembersList Error', err);
        // TODO: Add error handling here
      });
    }

    var getHouseholdMemberType = function (memberId) {
      if ($rootScope.selectedHousehold.householdId === memberId) {
        return "headOfHousehold"
      } else {
        return "householdMember"
      }
    };

  });
