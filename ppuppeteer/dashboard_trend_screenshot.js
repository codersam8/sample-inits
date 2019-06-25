const puppeteer = require('puppeteer');

const searchable = process.argv.includes('--searchable');

const avisoURL = 'http://localhost:8090';

(async() => {
    const browser = await puppeteer.launch({headless: false,
                                            slowMo: 50});
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 800, deviceScaleFactor: 2});
    await page.goto(avisoURL);
    // Taking screen shot of welcome page
    await page.screenshot({path: 'sign_in.png'});

    // Inserting username into username field
    await page.type('#username', process.env.AVISO_USER);
    await page.click('.submitbtn');

    // Waiting on appearance of SIGN IN button that is disabled
    // had to do this as no new selector is being added or not page load is happening
    // Type password
    await page.waitForSelector('.button, .submitbtn, .disabled');
    await page.type('#login_password', process.env.AVISO_PWD);
    await page.waitForSelector('.button.submitbtn.valid');
    await page.screenshot({ path: 'password_page.png' });

    // await page.evaluate(() => document.querySelector('div.outter-loginbox.show  button.button.submitbtn.valid').click());
    // Login and take screen shot of homepage
    await page.click('div.outter-loginbox.show  button.button.submitbtn.valid');
    await page.waitForNavigation();
    await page.screenshot({path: 'home.png'});

    // Logged in now switch take screen shot of forecast
    await page.select('#tenant_list', 'ooyala_test.com');
    await page.waitForNavigation();
    // await page.waitForSelector('.main-container', {visible: true});
    // await page.waitForSelector('.spinning-loader-overlay', {visible: false});
    await page.waitForSelector('.fm-grid-wrapper', {visible: true});
    await page.waitForSelector('.spinning-loader-overlay', {hidden: true });
    await page.screenshot({path: 'forecast.png'});


    await browser.close();
}
)();
