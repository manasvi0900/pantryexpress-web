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
    browser.get('/#/households');
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

    browser.wait(EC.presenceOf(element(by.id('physicalAddressCity'))), 10000);
    elements = browser.findElement(by.id('physicalAddressCity'));
    elements.sendKeys('TestHouseholdAutomationPhysicalAddressCity');

    browser.wait(EC.presenceOf(element(by.id('physicalAddressState'))), 10000);
    elements = browser.findElement(by.id('physicalAddressState'));
    elements.sendKeys('WA');

    browser.wait(EC.presenceOf(element(by.id('physicalAddressZip'))), 10000);
    elements = browser.findElement(by.id('physicalAddressZip'));
    elements.sendKeys('98312');

    browser.wait(EC.presenceOf(element(by.id('addressValidationDateId'))), 10000);
    elements = browser.findElement(by.id('addressValidationDateId'));
    elements.sendKeys('01302017');

    browser.wait(EC.presenceOf(element(by.id('addressValidationType'))), 10000);
    elements = browser.findElement(by.id('addressValidationType'));
    elements.sendKeys('Driving License');

    browser.wait(EC.presenceOf(element(by.id('transportationType'))), 10000);
    elements = browser.findElement(by.id('transportationType'));
    elements.sendKeys('By Bus');

    browser.wait(EC.presenceOf(element(by.id('hudCategory'))), 10000);
    elements = browser.findElement(by.id('hudCategory'));
    elements.sendKeys('Extremely Low');

    //browser.wait(EC.presenceOf(element(by.id('race'))), 10000);
    //elements = browser.findElement(by.id('race'));
    //elements.sendKeys('Asian');

    browser.wait(EC.presenceOf(element(by.id('nextButtonId'))), 10000);
    elements = browser.findElement(by.id('nextButtonId'));
    elements.click();

    // wait for element to load
    browser.wait(EC.presenceOf(element(by.id('firstName'))), 10000);

    // Administrator info
    browser.wait(EC.presenceOf(element(by.id('firstName'))), 10000);
    elements = browser.findElement(by.id('firstName'));
    elements.sendKeys('TestAdmininfoFirstName');

    browser.wait(EC.presenceOf(element(by.id('lastName'))), 10000);
    elements = browser.findElement(by.id('lastName'));
    elements.sendKeys('TestAdmininfoLastName');

    browser.wait(EC.presenceOf(element(by.id('email'))), 10000);
    elements = browser.findElement(by.id('email'));
    elements.sendKeys('test@test.com');

    browser.wait(EC.presenceOf(element(by.id('phone'))), 10000);
    elements = browser.findElement(by.id('phone'));
    elements.sendKeys('5551212123');

    browser.wait(EC.presenceOf(element(by.id('birthday'))), 10000);
    elements = browser.findElement(by.id('birthday'));
    elements.sendKeys('04261965');

    browser.wait(EC.presenceOf(element(by.id('gender'))), 10000);
    elements = browser.findElement(by.id('gender'));
    elements.sendKeys('Female');

    browser.wait(EC.presenceOf(element(by.id('birthday'))), 10000);
    elements = browser.findElement(by.id('birthday'));
    elements.sendKeys('04261965');

    browser.wait(EC.presenceOf(element(by.id('race'))), 10000);
    elements = browser.findElement(by.id('race'));
    elements.sendKeys('Asian');

    browser.wait(EC.presenceOf(element(by.id('addhouseholdMemberButtonId'))), 10000);
    elements = browser.findElement(by.id('addhouseholdMemberButtonId'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('nextButtonId'))), 10000);
    elements = browser.findElement(by.id('nextButtonId'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('householdSignupButtonId'))), 10000);
    // SignUp
    elements = browser.findElement(by.id('householdSignupButtonId'));
    elements.click();
    // browser.waitForAngular();
    browser.wait(EC.presenceOf(element(by.id('householdId'))), 10000);
    elements = browser.findElement(by.id('householdId'));
    expect(elements.isDisplayed()).toBe(true);
//    expect(element.getText()).toBe('Splendid!');


  });
});


