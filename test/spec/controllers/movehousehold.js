'use strict';

describe('Controller: MovehouseholdCtrl', function () {

  // load the controller's module
  beforeEach(module('pantyexpressApp'));

  var MovehouseholdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MovehouseholdCtrl = $controller('MovehouseholdCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
