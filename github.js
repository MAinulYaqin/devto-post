const puppeteer = require('puppeteer')
const config = require('./config/user')

async function run () {
    const browser = await puppeteer.launch({
        headless: true
    })

    const page = await browser.newPage()

    await page.goto('https://www.github.com/login')
    // await page.screenshot({path: 'lol.png'})

    // Auto login and take a screenshot

    const USERNAME_INPUT = '#login_field'
    const PASSWORD_INPUT = '#password'
    const SUBMIT_BTN = '#login > form > .auth-form-body.mt-3 > .btn.btn-primary.btn-block'

    await page.click(USERNAME_INPUT)
    await page.keyboard.type(config.username)

    await page.click(PASSWORD_INPUT)
    await page.keyboard.type(config.password)

    await page.click(SUBMIT_BTN)
    await page.waitForNavigation()

    await page.goto('https://github.com/search?q=Ainul&type=Users')

    await page.screenshot({path: './github-search.png'})

    // Search value scrapper

    const USERNAME_LIST = '.user-list-item.f5.py-4:nth-of-type(INDEX) > .d-flex > .user-list-info.ml-2 > a'
    const LENGTH_SELECTOR_CLASS = 'user-list-item'
    
    let listLength = await page.evaluate((sel) => {
        return document.getElementsByClassName(sel).length
    }, LENGTH_SELECTOR_CLASS)

    for (let i = 1; i <= listLength; i++) {
        let usernameSelector = USERNAME_LIST.replace('INDEX', i)
        
        let username = await page.evaluate((sel) => {
            return document.querySelector(sel).getAttribute('href').replace('/', '');
        }, usernameSelector);

        console.log(username)
    }

    browser.close()
    console.log('is ended here')
}

run()