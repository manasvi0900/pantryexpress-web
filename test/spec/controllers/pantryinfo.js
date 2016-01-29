'use strict';

describe('Controller: PantryinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('pantyexpressApp'));

  var PantryinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PantryinfoCtrl = $controller('PantryinfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PantryinfoCtrl.awesomeThings.length).toBe(3);
  });
});
