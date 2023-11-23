const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { choose } = require('./support/index.js');

Then('I should see {string} value at {int}', (statsClass, statsValue) => {
  cy.get(`.${statsClass} .val`).should('have.text', `${statsValue}`);
});

Then('I should see {string} in {string}', (statsContent, statsClass) => {
  cy.get(`.${statsClass} .bag-content > span`).should('have.text', `${statsContent}`);
});

Then('I should see {string} {string} bar at {string}', (statsClass, barClass, styleWidth) => {
  cy.get(`.${statsClass} .${barClass} > div`).should('have.attr', 'style', `${styleWidth}`);
});

Then('the descriptions should all be seen after I {string} a few times', (choiceText) => {
  let descList = {}, count = 0;

  function getDescription() {
    choose(choiceText); // click on the 'wait' button

    cy.get('.description').should('not.be.empty');
    cy.get('.description').then(el => {
      let descriptionText = el.els[0].text();
      descList[descriptionText] = true;
      count++;
      if (Object.keys(descList).length < 3 && count < 20) {
        getDescription();
        return;
      }
      cy.log(descList);
      expect(Object.keys(descList).length).to.equal(3);
    });
  }

  getDescription();
});