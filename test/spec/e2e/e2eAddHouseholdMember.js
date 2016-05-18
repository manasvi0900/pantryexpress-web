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
    console.log("Starting Add Household Member");

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

    browser.wait(EC.presenceOf(element(by.id('findHouseholdLinkId'))), 10000);
    elements = browser.findElement(by.id('findHouseholdLinkId'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('searchHouseholdsButtonId'))), 10000);
    elements = browser.findElement(by.id('searchHouseholdsButtonId'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('householdSelection'))), 10000);
    elements = browser.findElement(by.id('householdSelection'));
    elements.click();



    browser.wait(EC.presenceOf(element(by.id('addHouseholdMemberBtn'))), 10000);
    elements = browser.findElement(by.id('addHouseholdMemberBtn'));
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

    browser.wait(EC.presenceOf(element(by.id('saveHouseholdButtonId'))), 10000);
    elements = browser.findElement(by.id('saveHouseholdButtonId'));
    elements.click();

    // TODO Need to add final check once test is complete
//    browser.wait(EC.presenceOf(element(by.id('householdId'))), 10000);
//    elements = browser.findElement(by.id('householdId'));
//    expect(elements.isDisplayed()).toBe(true);
//    expect(element.getText()).toBe('Splendid!');


  });
});


