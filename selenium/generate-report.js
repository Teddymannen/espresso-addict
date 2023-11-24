const generator = require('cucumber-html-reporter');
const options = {
  theme: 'bootstrap',
  jsonFile: `./selenium/results/chrome.json`,
  output: `./selenium/results/chrome.html`
};

generator.generate(options);