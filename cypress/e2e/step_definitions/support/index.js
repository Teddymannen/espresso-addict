


function chooseUntilLose(choice, maxLoops, currentLoop = 0) {

  // Make sure we don't get stuck in an infinite loop
  if (currentLoop >= maxLoops) { throw new Error('Did not die. Too many loops'); }

  choose(choice);

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

  choose(choice);
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

  choose(choice);

  cy.get('.bag-content span').then((elements) => {
    const bagContent = elements.els[0].text().toLowerCase();

    if (bagContent === item.toLowerCase()) { return; }
    chooseUntilItem(choice, item, maxLoops, currentLoop + 1);
  });
}

function choose(choice) {
  cy.get('.choices').contains(choice, { matchCase: false }).click();
}

function chooseMultipleTimes(choice, count) {
  for (let i = 0; i < count; i++) {
    choose(choice);
  }
}

function playWinPath() {
  choose('go south');
  choose('go west');
  chooseUntilChoice('wait', 'jam with the band', 20);
  choose('jam with the band');
  choose('go east');
  chooseMultipleTimes('go north', 2);
  choose('go east');
  chooseUntilItem('wait', 'a can of beer', 20);
  choose('go west');
  choose('go south');
  choose('enter the cafe');
  chooseMultipleTimes('buy an espresso', 3);
  chooseUntilChoice('wait', 'give beer to barista', 20);
  choose('give beer to barista');
}

module.exports = { choose, chooseMultipleTimes, chooseUntilLose, chooseUntilChoice, chooseUntilItem, playWinPath };