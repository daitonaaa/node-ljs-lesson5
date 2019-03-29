const path = require('path');
const app = require('../app');
const config = require('config');
const assert = require('assert');
const puppeteer = require('puppeteer');
const mongoose = require('../libs/mongoose');
const User = require(path.join(process.cwd(), 'controller', 'user'));


const opts = {
  headless: false,
  timeout: 60000,
  args: [
    '--disable-notifications'
  ],
};

const login = (page, password = config.get('login.localUser.password')) => {
  return new Promise(async (resolve) => {
    await page.type('#email', config.get('login.localUser.email'));
    await page.type('#password', password);

    await page.click('#submit');

    resolve();
  });
};

describe('local login tests', () => {
  let server, browser, page;

  before((done) => {
    server = app.listen(config.get('port'), () => {
      puppeteer
        .launch(opts)
        .then((_browser) => {
          browser = _browser;
          done();
        });
    });
  });

  after((done) => {
    browser.close();
    mongoose.disconnect();
    server.close(done);
  });

  it('default login', async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${config.get('port')}`, {waitUntil: 'networkidle0'});

    const heading = await page.evaluate(() => document.querySelector('form h2').textContent);
    assert.strictEqual(heading, 'Tel me who are you?');

    await login(page);

    const user = await User.getByEmail(config.get('login.localUser.email'));

    await page.waitForSelector('.user-info__email');
    const displayEmail = await page.evaluate(() => document.querySelector('.user-info__email').textContent);
    assert.strictEqual(user.email, displayEmail);

    await page.click('#logout');
  });

  it('login with incorrect password', async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${config.get('port')}`, {waitUntil: 'networkidle0'});

    const heading = await page.evaluate(() => document.querySelector('form h2').textContent);
    assert.strictEqual(heading, 'Tel me who are you?');

    await login(page, '123');

    await page.waitForSelector('.alert-danger');
    const errorText = await page.evaluate(() => document.querySelector('.alert-danger').textContent);
    assert.strictEqual(errorText, 'Password not corrent');
  });

  it('login with verify false', async () => {
    const user = await User.getByEmail(config.get('login.localUser.email'));
    user.verify = false;
    await user.save();

    page = await browser.newPage();
    await page.goto(`http://localhost:${config.get('port')}`, {waitUntil: 'networkidle0'});

    await login(page);

    await page.waitForSelector('.alert-danger');
    const errorText = await page.evaluate(() => document.querySelector('.alert-danger').textContent);
    assert.strictEqual(errorText, 'User is not verified');

    user.verify = true;
    await user.save();
  });
});
