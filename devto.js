const puppeteer = require('puppeteer');
const config = require('./config/user');

async function run() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto('https://dev.to');
    // await page.screenshot({path: './devto.png'});

    const SUBSTORIES_DOM = ".single-article.single-article-small-pic";
    const TITLE_SUBSTORIES = `${SUBSTORIES_DOM}:nth-of-type(INDEX) > a > .content > h3`;
    const LINK_SUBSTORIES = `${SUBSTORIES_DOM}:nth-of-type(INDEX) > .small-pic-link-wrapper.index-article-link`

    let listLength = await page.evaluate((sel) => (
        document.querySelectorAll(sel).length
    ), SUBSTORIES_DOM)

    for (let i = 1; i <= listLength; i++) {
        let titleSelector = TITLE_SUBSTORIES.replace('INDEX', i)
        let linkSelector = LINK_SUBSTORIES.replace('INDEX', i)

        let title = await page.evaluate((sel) => {
            if (!document.querySelector(sel)) return '\n\n\n =========== nothing to see :( ==========';
            else return document.querySelector(sel).textContent;
        }, titleSelector);

        let link = await page.evaluate((sel) => {
            if (!document.querySelector(sel)) return '=========== no links found :( ==========';
            else return document.querySelector(sel).getAttribute('href')
        }, linkSelector)

        console.log(title, link)
    }

    browser.close();
}

run();