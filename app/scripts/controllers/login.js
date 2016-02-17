'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('LoginCtrl', function ($scope,$window, $location,$rootScope) {
    $scope.login = function (){
      //TODO need to get real object here
      var user = '{\"name\":\"Joe\"}';
      $rootScope.user = JSON.parse(user);
      $rootScope.loggedin = true; //Setting bit fir if statemetn in html
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

    $scope.setNavBar();
  });
