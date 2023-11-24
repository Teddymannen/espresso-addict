const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { choose } = require('./support/index.js');

Then('I should see the help screen', () => {
  cy.get('.choices').should('contain', 'Continue');
});

Then('I should see a description', () => {
  cy.get('.description').should('not.be.empty');
});

Then('I should see a picture with the src {string}', (src) => {
  cy.get('.big-image').should('have.attr', 'src', src);
});

When('I choose all {string}', (choices) => {
  if (!choices) return;
  choices.split(',').forEach(choice => {
    choose(choice);
  });
});
