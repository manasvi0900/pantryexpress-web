'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('MainCtrl', function () {

  })
  .filter('householdMemberType', function() {
    return function(input) {
      if (input == 'headOfHousehold') {
        return 'Head of Household';
      } else if (input == 'householdMember') {
        return 'Household Member';
      } else {
        return input;
      }
    }
  });
