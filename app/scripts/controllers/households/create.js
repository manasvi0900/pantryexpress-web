'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:HouseholdsCreateCtrl
 * @description
 * # HouseholdsCreateCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('HouseholdsCreateCtrl', function ($scope, $rootScope, $location, api, householdMemberTypeFilter) {

    $scope.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
    $scope.datePattern = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]((?:19|20)\d\d)/;
    $scope.currentIndex = 0;
    $scope.pages = [
      {
        name: 'Household Information',
        url: 'views/households/create/householdcreateinfo.html'
      },
      {
        name: 'Household Members',
        url: 'views/households/create/householdmembers.html'
      },
      {
        name: 'Household Confirmation',
        url: 'views/households/create/householdconfirmation.html'
      }
    ];
    $scope.template = $scope.pages[$scope.currentIndex];

    // Create temp member to handle model for current member being added
    $scope.tempMember = {
      isDisabled: false,
      isHispanic: false,
      isSpecialNeeds: false
    };


    // Create blank request object for household create request parameters
    $scope.req = {
      members: []
    };

    $scope.isReadOnly = function() {
    $scope.req.pantry = "isReadOnly";
    };

    //default to today's date
    $scope.validationDate = new Date();
    $scope.tempMember.validationDate = new Date();
    //$scope.household.validationDate = new Date();
    

    $scope.getFullName = function () {
          alert($scope.req.household.firstName + " " + $scope.req.household.middleName + " " + $scope.req.household.lastName);
    };
    $scope.SetHHType = function()
    {
        if($scope.req.members.length === 0)
        {
          $scope.tempMember.memberType = "headOfHousehold";
        }
     }
    $scope.AddFormToScope = function(form)
    {
      $rootScope.myCurrentForm = form;
    }
    $scope.CheckMemberExists = function(form)
    {
      //this allows for skipping validation once we have a member created
      if($scope.template.name === 'Household Members'&&$scope.req.members.length === 0)
      {
        return true;
      }
      else
      {
        return false;
      }

    };

    $scope.goto = function (targetIndex){
      if(targetIndex<$scope.currentIndex)
      {}
      else {
        if ($scope.CheckMemberExists() || $rootScope.myCurrentForm.$invalid) {
          angular.forEach($rootScope.myCurrentForm.$error, function (type) {
            angular.forEach(type, function (field) {
              field.$touched = true;
            });
          });
          return;
        }
      }

      $scope.currentIndex = targetIndex;
      $scope.template = $scope.pages[$scope.currentIndex];
    };

    $scope.next = function (form){
      if(($scope.CheckMemberExists())||form.$invalid)
      {
        return;
      }
      $scope.currentIndex++;
      $scope.goto($scope.currentIndex);
    };

    $scope.previous = function (){
      $scope.currentIndex--;
      $scope.goto($scope.currentIndex);
    };

    $scope.addHouseholdMember = function (form){

      if(form.$invalid === true)
      {
        return;
      }

      $scope.req.members.push($scope.tempMember);

      angular.forEach(form.$error, function(type) {
        angular.forEach(type, function(field) {
          field.$touched = false;
        });
      });

      // Reset temp member to default empty object
      $scope.tempMember = {
        isDisabled: false,
        isHispanic: false,
        isSpecialNeeds: false,
        memberType: 'householdMember'
      };
    };

    $scope.createHousehold = function (){
      // Write model data for request
      console.log('HouseholdsCreateRequest', $scope.req);

      // Call create household operation via API service
      api.postPantriesByPantryIdHouseholds({ pantryId: $rootScope.selectedPantry.id, HouseholdsCreateRequest: $scope.req }).then(function (data){
        console.log('HouseholdsCreateResponse: ', data);
        // Write newly created household to root scope
        $rootScope.selectedHousehold = data.household;

        // Redirect to Edit Households page for newly created household
        $location.url('/households/edit');

      },function(err){
        console.error('HouseholdsCreateError', err);
        // TODO: Add error handling here
      });
    }

});


