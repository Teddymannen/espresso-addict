const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
const { choose, chooseMultipleTimes, chooseUntilChoice, chooseUntilItem, playWinPathTimes } = require('../common/game-nav');

Given('I am on the start page', async function () {
  await this.driver.get('http://localhost:3000/');
});

When('I click {string} until I lose', async function (buttonText) {
  for (let i = 0; i < 20; i++) {
    // click the button
    await choose(this.driver, buttonText);
    // check how much health we have
    let health = await this.driver.findElement(By.css('.health .val')).getText();
    if (health === '0') {
      return; // we lost
    }
  }
  expect(false).to.equal(true); // we didn't lose after 20 clicks
});

When('I click {string}', async function (buttonText) {
  // await this.driver.findElement(By.xpath(`//*[@class='choices']/*/*[contains(text(), '${buttonText}')]`)).click();
  await choose(this.driver, buttonText);
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

Given('the player is invincible', async function () {
  // Set the player's health to 100 everytime it is updated (selenium soltution)
  await this.driver.executeScript(() => {
    let originalUpdateStatus = window.updatePlayerStatus;

    window.updatePlayerStatus = (choice) => {
      if (choice.health !== undefined) {
        choice.health = 100; // Always set health to 100
      }
      originalUpdateStatus(choice);
    }
  });
});

When('I choose {string}', async function (choice) {
  await choose(this.driver, choice);
});

When('I choose {string} {int} times', async function (choice, count) {
  await chooseMultipleTimes(this.driver, choice, count);
});

When('I choose {string} until I can choose {string}', async function (choice, choiceToSee) {
  await chooseUntilChoice(this.driver, choice, choiceToSee, 20);
});

When('I choose {string} until I have {string} in my bag', async function (choice, item) {
  await chooseUntilItem(this.driver, choice, item, 20);
});

let failCount = -1;
When('I play the win path {int} times and save fail count', async function (count) {
  failCount = await playWinPathTimes(this.driver, count);
});

Then('I should have less than {int} fails', async function (maxFails) {
  console.log('failCount', failCount);
  expect(failCount).to.be.lessThan(maxFails);
});
