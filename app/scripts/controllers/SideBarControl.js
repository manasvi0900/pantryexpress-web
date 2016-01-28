'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:AboutCtrl
 * @description
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
.controller('SideBarCtrl', function($scope, $location) {
  $scope.$on('$locationChangeSuccess', function() {
    var path = $location.path();
    //EDIT: cope with other path
    if(path.includes('Donor'))
    {
      $scope.templateUrl= 'views/DonorSideBar.html'
    }
    else
    {
      $scope.templateUrl= 'views/PantryManagementSideBar.html'
    }
    //$scope.templateUrl = (path==='/signin' || path==='/contact') ? 'template/header4signin.html' : 'template/header4normal.html' ;

  });
})
