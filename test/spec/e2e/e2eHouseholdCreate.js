/**
 * Created by mark on 4/25/2016.
 */

/*global
 beforeEach: false,
 browser: false,
 by: false,
 describe: false,
 it: false,
 protractor: false,
 element: false
 */

describe('Example:', function () {
  'use strict';

  beforeEach(function () {
    console.log("Starting Signup New Household");
    // Load up a view and wait for it to be done with its rendering and epicycles.
    browser.get('http://localhost:3456/#/households');
    browser.waitForAngular();
  });

  it('SignUp NewHousehold', function () {
    // Initial Pantry Info
    var EC = protractor.ExpectedConditions;

    browser.wait(EC.presenceOf(element(by.id('logginButtonId'))), 10000);
    var elements = browser.findElement(by.id('logginButtonId'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('clientServiceDropDoenToggleId'))), 10000);
    elements = browser.findElement(by.id('clientServiceDropDoenToggleId'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('newhouseholdLinkId'))), 10000);
    elements = browser.findElement(by.id('newhouseholdLinkId'));
    elements.click();


    browser.wait(EC.presenceOf(element(by.id('physicalAddress'))), 10000);

    elements = browser.findElement(by.id('physicalAddress'));
    elements.sendKeys('TestHouseholdAutomationPhysicalAddressLine1');

    elements = browser.findElement(by.id('physicalAddressCity'));
    elements.sendKeys('TestHouseholdAutomationPhysicalAddressCity');

    elements = browser.findElement(by.id('physicalAddressState'));
    elements.sendKeys('WA');

    elements = browser.findElement(by.id('physicalAddressZip'));
    elements.sendKeys('98312');

    elements = browser.findElement(by.id('addressValidationDateId'));
    elements.sendKeys('01302017');

    elements = browser.findElement(by.id('addressValidationType'));
    elements.sendKeys('Driving License');

    elements = browser.findElement(by.id('transportationType'));
    elements.sendKeys('By Bus');

    elements = browser.findElement(by.id('hudCategory'));
    elements.sendKeys('Extremely Low');

    elements = browser.findElement(by.id('nextButtonId'));
    elements.click();

    // wait for element to load
    browser.wait(EC.presenceOf(element(by.id('firstName'))), 10000);

    // Administrator info
    elements = browser.findElement(by.id('firstName'));
    elements.sendKeys('TestAdmininfoFirstName');

    elements = browser.findElement(by.id('lastName'));
    elements.sendKeys('TestAdmininfoLastName');

    elements = browser.findElement(by.id('email'));
    elements.sendKeys('test@test.com');

    elements = browser.findElement(by.id('phone'));
    elements.sendKeys('5551212');

    elements = browser.findElement(by.id('birthday'));
    elements.sendKeys('04261965');

    elements = browser.findElement(by.id('gender'));
    elements.sendKeys('Female');

    elements = browser.findElement(by.id('birthday'));
    elements.sendKeys('04261965');





    elements = browser.findElement(by.id('addhouseholdMemberButtonId'));
    elements.click();

    elements = browser.findElement(by.id('nextButtonId'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('householdSignupButtonId'))), 10000);
    // SignUp
    elements = browser.findElement(by.id('householdSignupButtonId'));
    elements.click();
    browser.waitForAngular();

  });
});


