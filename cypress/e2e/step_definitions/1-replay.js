const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { choose, chooseMultipleTimes, chooseUntilLose, chooseUntilChoice, chooseUntilItem, playWinPath } = require('./support/index.js');

Given('I am on the start page', () => {
  cy.visit('/');
});

Given('the player is invincible', () => {
  cy.window().then((win) => {
    let originalUpdateStatus = win.updatePlayerStatus;

    win.updatePlayerStatus = (choice) => {
      if (choice.health !== undefined) {
        choice.health = 100; // Always set health to 100
      }
      originalUpdateStatus(choice);
    }
  });
});

When('I click {string} until I lose', (buttonText) => {
  chooseUntilLose(buttonText, 20);
});

When('I click {string}', (buttonText) => {
  cy.contains(buttonText, { matchCase: false }).click();
});

Then('I should see the start page', () => {
  // Check for the name of location (probably in description)
  cy.contains('outside the Cloud Forest Cafe').should('be.visible');
});

Then('I should have more than 0 health', () => {
  cy.get('.health .val').should('not.have.text', '0');
  cy.get('.health .val').should('not.have.text', '');
});


When('I choose {string}', (choiceText) => {
  choose(choiceText);
});

When('I choose {string} until I can choose {string}', (choiceText, choiceToSee) => {
  chooseUntilChoice(choiceText, choiceToSee, 20);
});


When('I choose {string} {int} times', (choiceText, count) => {
  chooseMultipleTimes(choiceText, count);
});

When('I choose {string} until I have {string} in my bag', (choiceText, itemText) => {
  chooseUntilItem(choiceText, itemText, 20);
});

When('I play the win path', () => {
  playWinPath();
});