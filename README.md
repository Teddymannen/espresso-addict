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

We run the cypress tests using Github Actions. The tests are run on every push or pull request to the main branch.

## Frameworks

Cypress and Selenium + Cucumber

## Test cases and scenarios



## Difficulties in testing randomness



## Test coverage & Test ideas


