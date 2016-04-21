/**
 * Created by mark on 4/12/2016.
 */

/*global
 beforeEach: false,
 browser: false,
 by: false,
 describe: false,
 it: false
 */

describe('Example:', function () {
  'use strict';

  beforeEach(function () {
    // Load up a view and wait for it to be done with its rendering and epicycles.
    browser.get('#/signup');
    browser.waitForAngular();
  });

  it('SignUp New Pantry', function () {
    // Initial Pantry Info
    var element = browser.findElement(by.id('pantryName'));
    element.sendKeys('TestPantryAutomation');

    element = browser.findElement(by.id('physicalAddressLine1'));
    element.sendKeys('TestPantryAutomationPhysicalAddressLine1');

    element = browser.findElement(by.id('physicalAddressCity'));
    element.sendKeys('TestPantryAutomationPhysicalAddressCity');

    element = browser.findElement(by.id('physicalAddressState'));
    element.sendKeys('WA');

    element = browser.findElement(by.id('physicalAddressZip'));
    element.sendKeys('98312');

    element = browser.findElement(by.id('email'));
    element.sendKeys('test@test.com');

    element = browser.findElement(by.id('officePhone'));
    element.sendKeys('5551212');

    element = browser.findElement(by.id('physicalAddressSame'));
    element.click();

    element = browser.findElement(by.id('nextButtonId'));
    element.click();

    // Administrator info
    element = browser.findElement(by.id('firstName'));
    element.sendKeys('TestAdmininfoFirstName');

    element = browser.findElement(by.id('lastName'));
    element.sendKeys('TestAdmininfoLastName');

    element = browser.findElement(by.id('jobTitle'));
    element.sendKeys('TestAdmininfoJobTitle');

    element = browser.findElement(by.id('phone'));
    element.sendKeys('5551212');

    element = browser.findElement(by.id('email'));
    element.sendKeys('test@test.com');

    element = browser.findElement(by.id('addDirectorButtonId'));
    element.click();

    element = browser.findElement(by.id('nextButtonId'));
    element.click();

    // SignUp
    element = browser.findElement(by.id('pantrysignupButtonId'));
    element.click();
    browser.waitForAngular();

  });
});
