/**
 * Created by mark on 4/12/2016.
 */

/*global
 beforeEach: false,
 browser: false,
 by: false,
 describe: false,
 expect: false,
 it: false
 */

describe('Example:', function () {
  'use strict';

  beforeEach(function () {
    console.log("Testing Homepage");
    // Load up a view and wait for it to be done with its rendering and epicycles.
    browser.get('http://0.0.0.0:8081/#/');
    browser.waitForAngular();
  });

  it('view Main Page', function () {
    var element = browser.findElement(by.id('spendedId'));
    expect(element.isDisplayed()).toBe(true);
    expect(element.getText()).toBe('Splendid!');
  });
});


