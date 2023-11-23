const { is } = require("cypress/types/bluebird");



function chooseUntilLose(choice, maxLoops, postChoiceCallback, currentLoop = 0) {

  // Make sure we don't get stuck in an infinite loop
  if (currentLoop >= maxLoops) { throw new Error('Did not die. Too many loops'); }

  choose(choice, postChoiceCallback);

  // Check if we are dead yet
  cy.get('.health .val').then((element) => {
    const healthSpan = element.els[0];
    const health = parseInt(healthSpan.text());
    if (health > 0) { chooseUntilLose(choice, maxLoops, currentLoop + 1); }
    return;
  });
}


function chooseUntilChoice(choice, choiceToSee, maxLoops, postChoiceCallback, currentLoop = 0) {


  // Make sure we don't get stuck in an infinite loop
  if (currentLoop >= maxLoops) { throw new Error('Did not see choice. Too many loops'); }

  choose(choice, postChoiceCallback);

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


function chooseUntilItem(choice, item, maxLoops, postChoiceCallback, currentLoop = 0) {

  // Make sure we don't get stuck in an infinite loop
  if (currentLoop >= maxLoops) { throw new Error('Did not see item. Too many loops'); }

  choose(choice, postChoiceCallback);

  cy.get('.bag-content span').then((elements) => {
    const bagContent = elements.els[0].text().toLowerCase();

    if (bagContent === item.toLowerCase()) { return; }
    chooseUntilItem(choice, item, maxLoops, currentLoop + 1);
  });
}

function choose(choice, postChoiceCallback) {
  cy.get('.choices').contains(choice, { matchCase: false }).click();
  if (postChoiceCallback) { postChoiceCallback(); }
}

function chooseMultipleTimes(choice, count, postChoiceCallback) {
  for (let i = 0; i < count; i++) {
    choose(choice, postChoiceCallback);
  }
}

function isDead(callback) {
  // Check if we are dead yet
  cy.get('.health .val').then((element) => {
    const healthSpan = element.els[0];
    const health = parseInt(healthSpan.text());
    if (health > 0) { return false; }
    callback();
  });
}

function playWinPath(totalPlays = 1, currentPlay = 1, deathCount = 0) {
  console.log('playWinPath');
  if (currentPlay > totalPlays) { return deathCount; }

  const callback = () => {
    // isDead(() => {
    //   playWinPath(totalPlays, currentPlay + 1, deathCount + 1); return;
    // })
  };


  for (let i = 0; i < totalPlays; i++) {
    choose('go south', callback);
    choose('go west', callback);
    chooseUntilChoice('wait', 'jam with the band', 20, callback);
    choose('jam with the band', callback);
    choose('go east', callback);
    chooseMultipleTimes('go north', 2, callback);
    choose('go east', callback);
    chooseUntilItem('wait', 'a can of beer', 20, callback);
    choose('go west', callback);
    choose('go south', callback);
    choose('enter the cafe', callback);
    chooseMultipleTimes('buy an espresso', 3, callback);
    chooseUntilChoice('wait', 'give beer to barista', 20, callback);
    choose('give beer to barista', callback);
  }

  return deathCount;
}

module.exports = { choose, chooseMultipleTimes, chooseUntilLose, chooseUntilChoice, chooseUntilItem, playWinPath };