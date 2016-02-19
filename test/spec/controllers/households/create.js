'use strict';

describe('Controller: HouseholdsCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('pantyexpressApp'));

  var HouseholdsCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HouseholdsCreateCtrl = $controller('HouseholdsCreateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(HouseholdsCreateCtrl.awesomeThings.length).toBe(3);
  });
});
