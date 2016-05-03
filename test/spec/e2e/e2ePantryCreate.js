/**
 * Created by mark on 4/12/2016.
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
    // Load up a view and wait for it to be done with its rendering and epicycles.
    browser.get('http://localhost:8080/#/signup');
    browser.waitForAngular();
  });

  it('SignUp New Pantry', function () {
    // Initial Pantry Info
    var EC = protractor.ExpectedConditions;

    browser.wait(EC.presenceOf(element(by.id('pantryName'))), 10000);
    browser.waitForAngular();
    var elements = browser.findElement(by.id('pantryName'));
    elements.sendKeys('TestPantryAutomation');

    browser.wait(EC.presenceOf(element(by.id('physicalAddressLine1'))), 10000);
    elements = browser.findElement(by.id('physicalAddressLine1'));
    elements.sendKeys('TestPantryAutomationPhysicalAddressLine1');

    elements = browser.findElement(by.id('physicalAddressCity'));
    elements.sendKeys('TestPantryAutomationPhysicalAddressCity');

    browser.wait(EC.presenceOf(element(by.id('physicalAddressState'))), 10000);
    elements = browser.findElement(by.id('physicalAddressState'));
    elements.sendKeys('WA');

    elements = browser.findElement(by.id('physicalAddressZip'));
    elements.sendKeys('98312');

    elements = browser.findElement(by.id('email'));
    elements.sendKeys('test@test.com');

    elements = browser.findElement(by.id('officePhone'));
    elements.sendKeys('5551212');

    elements = browser.findElement(by.id('physicalAddressSame'));
    elements.click();

    elements = browser.findElement(by.id('nextButtonId'));
    elements.click();

    // wait for element to load
    browser.wait(EC.presenceOf(element(by.id('firstName'))), 10000);
    browser.waitForAngular();

    // Administrator info
    elements = browser.findElement(by.id('firstName'));
    elements.sendKeys('TestAdmininfoFirstName');

    elements = browser.findElement(by.id('lastName'));
    elements.sendKeys('TestAdmininfoLastName');

    elements = browser.findElement(by.id('jobTitle'));
    elements.sendKeys('TestAdmininfoJobTitle');

    elements = browser.findElement(by.id('phone'));
    elements.sendKeys('5551212');

    elements = browser.findElement(by.id('email'));
    elements.sendKeys('test@test.com');

    elements = browser.findElement(by.id('addDirectorButtonId'));
    elements.click();

    elements = browser.findElement(by.id('nextButtonId'));
    elements.click();

    browser.wait(EC.presenceOf(element(by.id('pantrysignupButtonId'))), 10000);
    browser.waitForAngular();
    // SignUp
    elements = browser.findElement(by.id('pantrysignupButtonId'));
    elements.click();
    browser.waitForAngular();

  });
});

// "postinstall": "sed -i.bak 's/\"selenium\": \"[0-9\\.]*\"/\"selenium\": \"2.19\"/' node_modules/protractor/config.json"
