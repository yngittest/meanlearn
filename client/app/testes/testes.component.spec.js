'use strict';

describe('Component: TestesComponent', function() {
  // load the controller's module
  beforeEach(module('meanlearnApp.testes'));

  var TestesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TestesComponent = $componentController('testes', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
