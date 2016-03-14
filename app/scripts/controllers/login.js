'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('LoginCtrl', function ($scope,$window, $location, $rootScope, api) {
    $scope.login = function (){
      //TODO need to get real object here
      var user = '{\"name\":\"Joe\"}';
      $rootScope.user = JSON.parse(user);
      $rootScope.loggedin = true; //Setting bit fir if statemetn in html
      $scope.listPantries();
      $scope.setNavBar();
      $location.url('/');
    }
    $scope.logout = function (){
      $rootScope.user = undefined;
      $rootScope.loggedin = false;
      $scope.setNavBar();
      $window.location.href = '#/login';
    }
    $scope.gotologin = function (){
      $scope.logout();
    }

    $scope.headerCtrl = function () {
      $scope.getheader = function () {
        return 'views/navbar-loggedin.html';
      }
    }
    $scope.setNavBar = function (){
      if($rootScope.loggedin === true)
      {
        $rootScope.topnavbar = {url: 'views/navbar-loggedin.html'};
      }
      else
      {
        $rootScope.topnavbar = {url: 'views/navbar-notloggedin.html'};
      }
    }
    
    $scope.listPantries = function(){
      api.getPantries().then(function (data){
        $rootScope.pantries = data;
        $rootScope.selectedPantry = $rootScope.pantries.items[0];
        console.log("Selected Pantry set to:", $rootScope.selectedPantry.id);
        
      },function(err){
        console.error('PantriesList Error', err);
        // TODO: Add error handling here
      });
    }
    
    $scope.setSelectedPantry = function(pantry){
      console.log("Selected Pantry updated to: " + pantry.id);
      $rootScope.selectedPantry = pantry;
    }

    $scope.setNavBar();
  });
