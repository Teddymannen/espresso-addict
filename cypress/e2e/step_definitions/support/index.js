


function chooseUntilLose(choice, maxLoops, currentLoop = 0) {
  cy.get('.choices').contains(choice, { matchCase: false }).click();

  // Make sure we don't get stuck in an infinite loop
  if (currentLoop >= maxLoops) { throw new Error('Did not die. Too many loops'); }

  // Check if we are dead yet
  cy.get('.health .val').then((element) => {
    const healthSpan = element.els[0];
    const health = parseInt(healthSpan.text());
    if (health > 0) { chooseUntilLose(choice, maxLoops, currentLoop + 1); }
    return;
  });
}


function chooseUntilChoice(choice, choiceToSee, maxLoops, currentLoop = 0) {


  // Make sure we don't get stuck in an infinite loop
  if (currentLoop >= maxLoops) { throw new Error('Did not see choice. Too many loops'); }

  cy.get('.choices').contains(choice, { matchCase: false }).click();

  // Check if choiceToSee is there
  cy.get('.choices ul li').then((elements) => {
    const choicesJq = elements.els[0];
    const choices = [];
    // Get choices text
    for (let i = 0; i < choicesJq.length; i++) {
      choices.push(choicesJq[i].textContent.toLowerCase());
    }

    if (choices.includes(choiceToSee.toLowerCase())) { return; }
    chooseUntilChoice(choice, choiceToSee, maxLoops, currentLoop + 1);
  });
}


function chooseUntilItem(choice, item, maxLoops, currentLoop = 0) {

  // Make sure we don't get stuck in an infinite loop
  if (currentLoop >= maxLoops) { throw new Error('Did not see item. Too many loops'); }

  cy.get('.choices').contains(choice, { matchCase: false }).click();

  cy.get('.bag-content span').then((elements) => {
    const bagContent = elements.els[0].text().toLowerCase();

    if (bagContent === item.toLowerCase()) { return; }
    chooseUntilItem(choice, item, maxLoops, currentLoop + 1);
  });
}

function choose(choice) {
  cy.get('.choices').contains(choice, { matchCase: false }).click();
}

module.exports = { choose, chooseUntilLose, chooseUntilChoice, chooseUntilItem };