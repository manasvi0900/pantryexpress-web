'use strict';

describe('Controller: HouseholdCtrl', function () {

  // load the controller's module
  beforeEach(module('pantyexpressApp'));

  var HouseholdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HouseholdCtrl = $controller('HouseholdCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
