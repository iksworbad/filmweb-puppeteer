import puppeteer from 'puppeteer'

export const openPuppeteer = async () => {
    let launchOptions = { 
      headless: true, 
      args: [
        '--start-maximized',
      ]
      };
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setViewport({width: 1366, height: 768});
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    return {browser, page};
}
