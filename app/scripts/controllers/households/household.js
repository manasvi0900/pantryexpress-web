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
      if(name === 'new')
      {
        $scope.template = $scope.templates['new'];
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
      if(name === 'newser2')
      {
        $scope.template = $scope.templates['newser2'];
        $scope.template.init();
      }
      if(name === 'MainNewService')
      {
        $scope.template = $scope.templates['MainNewService'];
        $scope.template.init();
      }
      if(name === null)
      {
        $scope.template = $scope.templates['find'];
        $scope.template.init();
      }
    }
    var viewname = ($routeParams.householdview);
    console.log('HouseholdCtrl:' + viewname);
    var currentIndex = 0;

    // Define various page templates within a templates object map
    $scope.templates = {};
    $scope.templates['edit'] = {
      name: 'Edit Household',
      url: 'views/households/edithousehold.html',
      visible: true,
      init: function() {
        // Check if a household was previously selected; If not, redirect to find page
        if (!$rootScope.selectedHousehold || !$rootScope.selectedHousehold.householdId || $rootScope.selectedHousehold.householdId == "") {
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

    $scope.templates['new'] = {
      name: 'New Household',
      url: 'views/households/create/householdcreateinfo.html',
      visible: true,
      init: function() {

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
        // Check if a member was previously selected; If not, redirect to find page
        if (!$rootScope.selectedHouseholdMember || !$rootScope.selectedHouseholdMember.memberId || !$rootScope.selectedHouseholdMember.memberId === "") {
          $location.url('/households/edit');
        }

        if ($rootScope.selectedHouseholdMember && $rootScope.selectedHouseholdMember.memberId) {
          console.log("Selected Member ID: ", $rootScope.selectedHouseholdMember.memberId);
          getSelectedHouseholdMember();
        } else {
          console.log("Selected Member ID: Undefined");
        }

        if ($rootScope.selectedHouseholdMember && $rootScope.selectedHouseholdMember.memberId) {
          getSelectedHouseholdMember();
        }

      }
    };
    $scope.templates['newservice'] = {
      name: 'New Service',
      url: 'views/households/newservice.html',
      visible: true,
      init: function() {}
    };
    $scope.templates['newser2'] = {
      name: 'New Service2',
      url: 'views/households/newser2.html',
      visible: true,
      init: function() {}
    };
    $scope.templates['MainNewService'] = {
      name: 'Main New Service',
      url: 'views/households/MainNewService.html',
      visible: true,
      init: function() {
        if (!$rootScope.selectedHousehold || !$rootScope.selectedHousehold.householdId || $rootScope.selectedHousehold.householdId == "") {
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

    $scope.pages = [
        $scope.templates['find'],
        $scope.templates['new']
    ];


    $scope.template = $scope.pages[currentIndex];

    $scope.newHousehold= function () {
      $location.path('views/households/newhousehold.html');
    };
    $scope.editHousehold= function () {
      $location.url('/households/edit');
    };
    $scope.newService= function () {
      $location.url('/households/MainNewService');
    };
    $scope.editHouseholdMembers= function () {
      $location.url('/households/editmember');
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

    $scope.isReadOnly = function() {
      $scope.req.pantry = "isReadOnly";
    };

    $scope.householdsFilter = {};
    $scope.household = {};
    $scope.households = [];
    $scope.members = [];

    $scope.findHouseholds = function (){
      listFilteredHouseholds();
    };

    $scope.editHousehold = function (){
      getHousehold();
      $location.url( '/households/edit' )
    };

    $scope.editHouseholdMembers = function (){
      getSelectedHouseholdMember();
      $location.url( '/households/editmember' )
    };

    $scope.saveHousehold = function (){
      putHousehold();
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

    function putHousehold(){
      console.log("HouseholdsPut Household ID: ", $rootScope.selectedHousehold.householdId );
      console.log("HouseholdsPut Pantry ID: ", $rootScope.selectedPantry.id  );
      api.putPantriesByPantryIdHouseholdsByHouseholdId({ householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id, Household: $rootScope.selectedHousehold }).then(function (data){
        $rootScope.household = data;
        console.log('HouseholdsPut Response: ', $scope.household, data);
      },function(err){
        console.error('HouseholdsPut Error', err);
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

    function listFilteredHouseholds() {
      // Build filter object
      var filterCriteria = { pantryId: $rootScope.selectedPantry.id };
      console.log("HouseholdsFilter Object", $scope.householdsFilter);
      for (var filter in $scope.householdsFilter) {
        filterCriteria[filter] = $scope.householdsFilter[filter];
      }
      console.log("HouseholdsList Filter", filterCriteria);
      // Call list households operation via API service using filter criteria
      api.getPantriesByPantryIdHouseholds(filterCriteria).then(function (data){
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

    $scope.setSelectedHouseholdMember = function(member){
      $rootScope.selectedHouseholdMember = member;
      console.log("Selected Member updated to: ", member.memberId);
    };



    function getSelectedHouseholdMember(){
      console.log("HouseholdMemberGet Household ID: ", $rootScope.selectedHousehold.householdId );
      console.log("HouseholdMemberGet Pantry ID: ", $rootScope.selectedPantry.id  );
      console.log("HouseholdMemberGet Household ID: ", $rootScope.selectedHouseholdMember.memberId );
      api.getPantriesByPantryIdHouseholdsByHouseholdIdMembersByMemberId({ householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id, memberId: $rootScope.selectedHouseholdMember.memberId}).then(function (data) {
        $scope.member = data;
        console.log('HouseholdMemberGet Response: ', $scope.member);

      },function(err){
        console.error('HouseholdMemberGet Error', err);
        // TODO: Add error handling here
      });
    }

    $scope.ScrollBarsProvider = function(){

    }

  });
