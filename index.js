const puppeteer = require('puppeteer');

let config = require('./config/user.js');

// DOM selector
const USERNAME_SELECTOR = '#login_field';
const PASSWORD_SELECTOR = '#password';
const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

// Search
const userToSearch = 'MAinulYaqin'
const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;

async function run () {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto('https://www.github.com/login');

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(config.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(config.password);

    await page.click(BUTTON_SELECTOR);

    await page.waitForNavigation();

    await page.screenshot({path: './github.png'})
    console.log('success')
}

run()