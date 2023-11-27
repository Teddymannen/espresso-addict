# espresso-addict-tests

## How to run tests

1. Install dependencies
```bash
npm install
```

2. Start the server
```bash
npm start
```

3. Run tests

### Cypress

**Run tests in terminal (headless)**
```bash
npm test
```

**Run tests in browser**
```bash
npm run test-ui
```

### Selenium

**Run tests in terminal (headless)**

Make sure `headless` is set to `true` in [selenium/config.js](selenium/config.js)
```bash
npm run test-selenium
```

**Run tests in browser**

Make sure `headless` is set to `false` in [selenium/config.js](selenium/config.js)
```bash
npm run test-selenium
```

## Github Actions

We run the cypress tests and the selenium tests using Github Actions. The tests are run on every push or pull request to the main branch.

## Frameworks

Cypress and Selenium + Cucumber

## Test cases and scenarios

### Replay

We test that when you lose or win a game, you can replay the game by clicking the "Play again" button.

When testing the winning path we make the player invincible using monkey patching. This is done using the `updatePlayerStatus` function. We simply check if the health is being updated and if it is we give the player 100hp.

We also wrote this feature using Selenium. The scenarios are the same as the Cypress tests. When using Selenium we also added the scenario where the player plays multiple times and check the amount of times the player died.

### Gameplay functions

We test different gameplay functions such as values updating, bag content updating, the health progress bar updating and that the player sees all descriptions when clicking "Wait".

We first check that the initial values are correct. We then check that the values update correctly after buying an espresso (`health+10`, `money-5`, `espressos+1`).

After that we check that the bag content updates correctly by going to the bar and click "Wait" until the player is given a beer.

To test the health progress bar we check that the `width` of the progress bar is correct percentage after buying an espresso.

Finally we check that the player sees all descriptions when clicking "Wait" by using a `Scenario Outline`. In the `Examples` table we have the amount of descriptions we expect to see when clicking "Wait" at each location.

### World

We test that all locations have a description and image.

We first test the help scene. We then test all locations using a `Scenario Outline` similar to the one used in the **gameplay functions** tests. We then test the win and lose scenes.


## Difficulties in testing randomness

More thoughts on this in this [repo README.md](https://github.com/lelonS/word-corners-tests#difficulties-in-testing-randomness)

We found that using Selenium made it easier to deal with randomness as we could use if statements and easily check the gamestate. When using Cypress we had to use recursion to check the gamestate which was a bit more difficult to implement and understand.

One difficulty we ran into was that you can get unlucky and die when waiting, even if you're doing everything right. We fixed this by making the player invincible using monkeypatching when testing stuff not related to the player dying.

Another difficulty we ran into is that the player has to click "Wait" until a specific gamestate is reached. This meant that it is random how many times the player has to click "Wait". We solved this by using recursion in cypress (with selenium we simply made a loop) to check the gamestate and click "Wait" until the gamestate is correct.

## Test coverage & Test ideas

We have decent test coverage. We have tested the important functions and scenarios such as winning and losing the game, buying an espresso, waiting at the bar and seeing all descriptions when waiting.

Some tests we could have written are:

* We are not testing that a description and image is shown when at inside-cafe-barista-phone (going inside the cafe and waiting)
* We are not testing the fullscreen button
* We are not testing that the player can't buy an espresso if they don't have enough money
* We are not testing that the player can't give the barista a beer if they don't have a beer
* We don't test that we get the correct description for a location

For HIVAT we could have clicked random buttons and collected data about the game. We could have used this data to find bugs and improve the game.
