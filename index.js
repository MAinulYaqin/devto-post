const puppeteer = require('puppeteer');

async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.github.com/MAinulYaqin');
    await page.screenshot({path: './github.png'})
}

run()