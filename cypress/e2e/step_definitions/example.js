const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Given('example', () => {
  cy.visit('/');
});