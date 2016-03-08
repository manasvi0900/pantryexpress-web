'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('SignupCtrl', function ($scope,$rootScope, api, ngDialog) {

    //Regex pattern for email, need @.something for schema validation
    $scope.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
    $scope.currentIndex = 0;
    $scope.pages = [
      {
        name: 'Pantry Information',
        url: 'views/signup/pantryinfo.html'
      },
      {
        name: 'Administrator Information',
        url: 'views/signup/administratorinfo.html'
      },
      {
        name: 'Signup Confirmation',
        url: 'views/signup/signupconfirmation.html'
      }
    ];
    $scope.template = $scope.pages[$scope.currentIndex];

    // Create temp user to handle model for current user being added
    $scope.tempAdminUser = {};

    // Create blank request object for PantriesCreateRequest parameters
    $scope.req = {
      users: []
    };

    //matches mailing address to phyical address on clicking checkbox
      $scope.matchMailingToPhysicalAddress = function() {
      $scope.req.pantry.mailingAddress = angular.copy($scope.req.pantry.physicalAddress);
    };
    // signup confirmation read only

      $scope.isReadOnly = function() {
      $scope.req.pantry = "isReadOnly";
    };

    $scope.CheckDirectorExists = function(form)
    {
<<<<<<< HEAD:app/scripts/controllers/signup.js
      //this allows for skipping validation once we have a director created
      if($scope.req.users.length === 0 ||
        form.adminEmailFormInput.$touched ||
        form.adminFirstNameFormInput.$touched ||
        form.adminLastNameFormInput.$touched ||
        form.adminTitleFormInput.$touched ||
        form.adminPhoneFormInput.$touched)
=======
      //this allows for skipping validatiion once we have a director created
      if($scope.req.users.length === 0)
>>>>>>> d8713834e7bef1eceded358e32bcd3353655b2cb:app/scripts/controllers/signup/signup.js
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

    $scope.next = function (form){
      if($scope.CheckDirectorExists()||form.$invalid)
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

    $scope.addDirector = function (form){
      //check form state before adding
      if(form.$invalid === true)
      {
        return;
      }
      // Push tempAdminUser to users array in request object
      $scope.req.users.push($scope.tempAdminUser);
      //resets required form states
      form.adminEmailFormInput.$touched = false;
      form.adminFirstNameFormInput.$touched = false;
      form.adminLastNameFormInput.$touched = false;
      form.adminTitleFormInput.$touched = false;
      form.adminPhoneFormInput.$touched = false;
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
