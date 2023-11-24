const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');

Given('I am on the start page', async function () {
  await this.driver.get('http://localhost:3000/');
});

When('I click {string} until I lose', async function (buttonText) {
  for (let i = 0; i < 20; i++) {
    // click the button
    await this.driver.findElement(By.xpath(`//*[contains(text(), '${buttonText}')]`)).click();
    // check how much health we have
    let health = await this.driver.findElement(By.css('.health .val')).getText();
    if (health === '0') {
      return; // we lost
    }
  }
  expect(false).to.equal(true); // we didn't lose after 20 clicks
});

When('I click {string}', async function (buttonText) {
  // click the button inside class "choices" and text
  let button = await this.driver.findElement(By.xpath(`//*[contains(text(), '${buttonText}')]`));
  await button.click();
});

Then('I should see the start page', async function () {
  // Look for a description that contains: "outside the Cloud Forest Cafe"
  await this.driver.wait(until.elementLocated(By.css('.description')), 5000);
  let description = await this.driver.findElement(By.css('.description')).getText();
  expect(description).to.contain('outside the Cloud Forest Cafe');
});

Then('I should have more than 0 health', async function () {
  // Look for the health value and make sure it's not 0
  await this.driver.wait(until.elementLocated(By.css('.health .val')), 5000);
  let health = await this.driver.findElement(By.css('.health .val')).getText();
  expect(health).to.not.equal('0');
});