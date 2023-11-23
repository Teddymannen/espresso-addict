const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Then('I should see {string} value at {int}', (statsClass, statsValue) => {
    cy.get(`.${statsClass} .val`).should('have.text', `${statsValue}`);
});

Then('I should see {string} in {string}', (statsContent, statsClass) => {
    cy.get(`.${statsClass} .bag-content > span`).should('have.text', `${statsContent}`);
});