const { By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');



async function choose(driver, choice) {
  // await driver.findElement(By.xpath(`//*[@class='choices']/*/*[contains(text(), '${choice}')]`)).click();
  let element = await driver.wait(until.elementLocated(By.xpath(`//*[@class='choices']/*/*[contains(text(), '${choice}')]`)), 5000);
  await element.click();
}

async function chooseMultipleTimes(driver, choice, count) {
  for (let i = 0; i < count; i++) {
    await choose(driver, choice);
  }
}

async function chooseUntilChoice(driver, choice, choiceToSee, maxLoops, stopOnLose = false) {
  for (let i = 0; i < maxLoops; i++) {
    if (stopOnLose && await isDead(driver)) { return; } // we died, so we can't continue
    // click the button
    await choose(driver, choice);

    // check if we can see the choice we want to see
    let choices = await driver.findElements(By.xpath(`//*[@class='choices']/*/*[contains(text(), '${choiceToSee}')]`));
    if (choices.length > 0) {
      return; // we can now choose the choice we want to see
    }
  }
}

async function chooseUntilItem(driver, choice, item, maxLoops, stopOnLose = false) {
  for (let i = 0; i < maxLoops; i++) {
    if (stopOnLose && await isDead(driver)) { return; } // we died, so we can't continue
    // click the button
    await choose(driver, choice);

    // check if we have the item in our bag
    let items = await driver.findElements(By.xpath(`//span[@class='bag-content']/span[contains(text(), '${item}')]`));
    if (items.length > 0) {
      return; // we can now have the item
    }

  }
}

async function isDead(driver) {
  let health = await driver.findElement(By.css('.health .val')).getText();
  return health === '0';
}


async function playWinPath(driver) {
  // Returns true if we won, false if we lost (died)
  const instructions = [
    { func: choose, args: ['Go south'] },
    { func: choose, args: ['Go west'] },
    { func: chooseUntilChoice, args: ['Wait', 'Jam with the band', 20, true] },
    { func: choose, args: ['Jam with the band'] },
    { func: choose, args: ['Go east'] },
    { func: chooseMultipleTimes, args: ['Go north', 2] },
    { func: choose, args: ['Go east'] },
    { func: chooseUntilItem, args: ['Wait', 'a can of beer', 20, true] },
    { func: choose, args: ['Go west'] },
    { func: choose, args: ['Go south'] },
    { func: choose, args: ['Enter the cafe'] },
    { func: chooseMultipleTimes, args: ['Buy an espresso', 3] },
    { func: chooseUntilChoice, args: ['Wait', 'Give beer to barista', 20, true] },
    { func: choose, args: ['Give beer to barista'] }
  ];

  for (let instruction of instructions) {
    await instruction.func(driver, ...instruction.args);
    if (await isDead(driver)) {
      return false;
    }
  }
  return true;
}

async function playWinPathTimes(driver, times) {
  let deathCount = 0;
  for (let i = 0; i < times; i++) {
    console.log(`Playing game ${i + 1} of ${times}`);
    const won = await playWinPath(driver);
    if (!won) {
      deathCount++;
    }
    await choose(driver, 'Play again');
  }
  return deathCount;
}

module.exports = {
  choose,
  chooseMultipleTimes,
  chooseUntilChoice,
  chooseUntilItem,
  playWinPathTimes
};