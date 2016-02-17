'use strict';

describe('Controller: DonorCtrl', function () {

  // load the controller's module
  beforeEach(module('pantyexpressApp'));

  var DonorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DonorCtrl = $controller('DonorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(DonorCtrl.awesomeThings.length).toBe(3);
  });
});
