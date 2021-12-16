const {remote } = require('webdriverio');

const getCompanies = async (url, parser) => {
  const browser = await remote({
      logLevel: 'trace',
      capabilities: {
          browserName: 'chrome',
          "goog:chromeOptions": {
            args: [
              "--headless",
              "--disable-gpu"
            ]
          }
      }
  });
  await browser.url(url);
  const companies = await browser.executeAsync(parser)

  await browser.deleteSession()

  return companies;
}

const getRedirectedUrl = async (url) => {
  const browser = await remote({
      logLevel: 'trace',
      capabilities: {
          browserName: 'chrome',
          "goog:chromeOptions": {
            args: [
              "--headless",
              "--disable-gpu",
              "--ignore-certificate-errors"
            ]
          }
      }
  });
  let pdfUrl;
  try {
    await browser.url(url);
    await setTimeout(()=> {}, 3000);
    pdfUrl = await browser.getUrl();
  } catch (error) {
    debugger;
  }
  
  await browser.deleteSession()
  return pdfUrl;
}

module.exports = {
  getCompanies,
  getRedirectedUrl
}