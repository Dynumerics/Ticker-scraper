const puppeteer = require('puppeteer');

const a = async (url, selector, parser) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil : 'domcontentloaded'})
  const companies = await page.$$eval(selector, parser);

  await browser.close();

  return companies;
}

module.exports = a