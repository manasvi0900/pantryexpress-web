'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:HouseholdsCreateCtrl
 * @description
 * # HouseholdsCreateCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('HouseholdsCreateCtrl', function ($scope, $rootScope, api, ngDialog) {

    $scope.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
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

    $scope.CheckMemberExists = function(form)
    {
      //this allows for skipping validatiion once we have a member created
      if($scope.req.members.length === 0 //||
        // form.adminEmailFormInput.$touched ||
        // form.adminFirstNameFormInput.$touched ||
        // form.adminLastNameFormInput.$touched ||
        // form.adminTitleFormInput.$touched ||
        // form.adminPhoneFormInput.$touched
        )
      {
        return true;
      }
      else
      {
        return false;
      }

    };

    $scope.goto = function (targetIndex){
      $scope.currentIndex = targetIndex;
      $scope.template = $scope.pages[$scope.currentIndex];
    };

    $scope.next = function (form){
      if(form.$invalid === true)
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

      // form.adminEmailFormInput.$touched = false;
      // form.adminFirstNameFormInput.$touched = false;
      // form.adminLastNameFormInput.$touched = false;
      // form.adminTitleFormInput.$touched = false;
      // form.adminPhoneFormInput.$touched = false;
      
      // Reset temp member to blank object
      $scope.tempMember = {};
    };
    
    $scope.createHousehold = function (){
      // Write model data for request
      console.log('HouseholdsCreateRequest', $scope.req);

      // Call create household operation via API service
      console.log("Selected Pantry ID: ", $rootScope.selectedPantry.id );
      api.postPantriesByPantryIdHouseholds({ pantryId: $rootScope.selectedPantry.id, HouseholdsCreateRequest: $scope.req }).then(function (data){
        console.log('Household: ', data);
        //notify();
        ngDialog.openConfirm({
          template:
                '<p>Household created with ID: ' + data.household.householdId + '!</p>' +
                '<div class="ngdialog-buttons">' +
                '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">OK</button>' +
                '</div>',
          plain: true
        });
      },function(err){
        console.error('HouseholdsCreateError', err);
        // TODO: Add error handling here
      });
    }

  });
