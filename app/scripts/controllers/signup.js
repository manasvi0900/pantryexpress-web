'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('SignupCtrl', function ($scope, api, ngDialog) {
    $scope.currentIndex = 0;
    $scope.pages = [
      {
        name: 'Pantry Information',
        url: 'views/pantryinfo.html'
      },
      {
        name: 'Administrator Information',
        url: 'views/administratorinfo.html'
      },
      {
        name: 'Signup Confirmation',
        url: 'views/signupconfirmation.html'
      }
    ];
    $scope.template = $scope.pages[$scope.currentIndex];

    // Create temp user to handle model for current user being added
    $scope.tempAdminUser = {};

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

    $scope.addDirector = function (){
      // Push tempAdminUser to users array in request object
      $scope.req.users.push($scope.tempAdminUser);
      //
      // Reset temp user to blank object
      $scope.tempAdminUser = {};
    };

    $scope.createPantry = function (){
      // Write model data for request
      console.log('PantriesCreateRequest', $scope.req);

      // Call postPantries operation via API service
      api.postPantries({ PantriesCreateRequest: $scope.req }).then(function (data){
        console.log('Pantry: ', data);
        //notify();
        ngDialog.openConfirm({
          template:
                '<p>Pantry created with ID: ' + data.pantry.id + '!</p>' +
                '<div class="ngdialog-buttons">' +
                '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">OK</button>' +
                '</div>',
          plain: true
        });
      },function(err){
        console.error('postPantries Error', err);
        // TODO: Add error handling here
      });
    }
  });
