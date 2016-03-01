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

    $scope.goto = function (targetIndex){
      $scope.currentIndex = targetIndex;
      $scope.template = $scope.pages[$scope.currentIndex];
    };

    $scope.next = function (){
      $scope.currentIndex++;
      $scope.goto($scope.currentIndex);
    };

    $scope.previous = function (){
      $scope.currentIndex--;
      $scope.goto($scope.currentIndex);
    };

    $scope.addHouseholdMember = function (){
      //$location.path( '/householdmembers.html' );
      //alert("Note Saved");
      // Push tempAdminUser to users array in request object
      $scope.req.users.push($scope.tempHousehold);
      //
      // Reset temp user to blank object
      $scope.tempHousehold = {};
    };

  });
