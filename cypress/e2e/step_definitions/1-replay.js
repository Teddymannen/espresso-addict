const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Given('I am on the start page', () => {
  cy.visit('/');
});

When('I click {string} until I lose', (buttonText) => {
  const maxLoops = 20;
  let loopCount = 0;

  function clickUntilDie() {

    cy.get('.choices').contains(buttonText, { matchCase: false }).click();

    // Make sure we don't get stuck in an infinite loop
    loopCount++;
    if (loopCount >= maxLoops) { throw new Error('Did not die. Too many loops'); }

    // Check if we are dead yet
    cy.get('.health .val').then((element) => {
      const healthSpan = element.els[0];
      const health = parseInt(healthSpan.text());
      if (health > 0) { clickUntilDie(); }
      return;
    });
  }

  clickUntilDie();
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
  cy.get('.choices').contains(choiceText, { matchCase: false }).click();
});

When('I choose {string} until I can choose {string}', (choiceText, choiceToSee) => {
  const maxLoops = 20;
  let loopCount = 0;

  function clickUntilChoice() {


    // Make sure we don't get stuck in an infinite loop
    loopCount++;
    if (loopCount >= maxLoops) { throw new Error('Did not see choice. Too many loops'); }

    cy.get('.choices').contains(choiceText, { matchCase: false }).click();

    cy.get('.choices ul li').then((elements) => {
      const choicesJq = elements.els[0];
      const choices = [];
      // Get choices text
      for (let i = 0; i < choicesJq.length; i++) {
        choices.push(choicesJq[i].textContent.toLowerCase());
      }

      if (choices.includes(choiceToSee.toLowerCase())) { return; }
      clickUntilChoice();
    });
  }

  clickUntilChoice();
});


When('I choose {string} {int} times', (choiceText, count) => {
  for (let i = 0; i < count; i++) {
    cy.get('.choices').contains(choiceText, { matchCase: false }).click();
  }
});

When('I choose {string} until I have {string} in my bag', (choiceText, itemText) => {
  const maxLoops = 20;
  let loopCount = 0;

  function clickUntilItem() {

    // Make sure we don't get stuck in an infinite loop
    loopCount++;
    if (loopCount >= maxLoops) { throw new Error('Did not see item. Too many loops'); }

    cy.get('.choices').contains(choiceText, { matchCase: false }).click();

    cy.get('.bag-content span').then((elements) => {
      const bagContent = elements.els[0].text().toLowerCase();

      if (bagContent === itemText.toLowerCase()) { return; }
      clickUntilItem();
    });
  }

  clickUntilItem();
});