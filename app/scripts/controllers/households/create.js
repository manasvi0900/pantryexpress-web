'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:HouseholdsCreateCtrl
 * @description
 * # HouseholdsCreateCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('HouseholdsCreateCtrl', function ($scope, $location, api, ngDialog) {

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
      },
    ];
    $scope.template = $scope.pages[$scope.currentIndex];

    // Create temp user to handle model for current user being added
    $scope.tempHousehold = {};

    // Create blank request object for PantriesCreateRequest parameters
    $scope.req = {
      users: []
    };

    $scope.CheckMemberExists = function(form)
    {
      //this allows for skipping validatiion once we have a director created
      if($scope.req.users.length === 0 ||
        form.adminEmailFormInput.$touched ||
        form.adminFirstNameFormInput.$touched ||
        form.adminLastNameFormInput.$touched ||
        form.adminTitleFormInput.$touched ||
        form.adminPhoneFormInput.$touched)
      {
        return true;
      }
      else
      {
        return false;
      }

    }

    $scope.goto = function (targetIndex){
      $scope.currentIndex = targetIndex;
      $scope.template = $scope.pages[$scope.currentIndex];
    };

    $scope.next = function (){
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

    $scope.addHouseholdMember = function (){

      if(form.$invalid === true)
      {
        return;
      }

      $scope.req.users.push($scope.tempHousehold);

      form.adminEmailFormInput.$touched = false;
      form.adminFirstNameFormInput.$touched = false;
      form.adminLastNameFormInput.$touched = false;
      form.adminTitleFormInput.$touched = false;
      form.adminPhoneFormInput.$touched = false;
      // Reset temp user to blank object
      $scope.tempHousehold = {};
    };

  });
