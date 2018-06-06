const puppeteer = require('puppeteer');
const config = require('./config/user');

async function run () {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto('https://dev.to');
    await page.screenshot({path: './devto.png'});

    browser.close();
}

run();