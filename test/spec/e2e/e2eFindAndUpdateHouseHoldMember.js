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
    console.log("Starting Find and Update Household Member");

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



    browser.wait(EC.presenceOf(element(by.id('editHouseholdBtn'))), 10000);
    elements = browser.findElement(by.id('editHouseholdBtn'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('memberSelection'))), 10000);
    elements = browser.findElement(by.id('memberSelection'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('updateHouseholdMembersBtn'))), 10000);
    elements = browser.findElement(by.id('updateHouseholdMembersBtn'));
    elements.click();

 var shift = Math.floor( Math.random() * 10000 );
    browser.waitForAngular();
    // household member info
    browser.wait(EC.presenceOf(element(by.id('firstName'))), 10000);
    elements = browser.findElement(by.id('firstName'));
    elements.sendKeys('TestAdmininfoFirstName'+shift);


    browser.wait(EC.presenceOf(element(by.id('saveHouseHoldMemberButtonId'))), 10000);
    elements = browser.findElement(by.id('saveHouseHoldMemberButtonId'));
    elements.click();



    // TODO Need to add final check once save is complete
//    browser.wait(EC.presenceOf(element(by.id('householdId'))), 10000);
//    elements = browser.findElement(by.id('householdId'));
//    expect(elements.isDisplayed()).toBe(true);
//    expect(element.getText()).toBe('Splendid!');


  });
});
