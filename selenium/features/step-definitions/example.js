const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');


Given('I do the example step', async function () {
  await this.driver.get('http://localhost:3000/');
});