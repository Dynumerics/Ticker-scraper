const puppeteer = require('./lib/puppeteer');
const storeResults = require('./lib/storeResult');

const sp100 = require('./lib/sp100');
const sp500 = require('./lib/sp500');

const getCompanies = async (universe) => {
    console.log(universe.url);
    const companies = await puppeteer(universe.url, universe.selector, universe.parser);
    console.log(companies.length);
    await storeResults(universe.path, companies);
}

// const russell3000 = require('./russell3000');
(async() => {
    [sp100, sp500].forEach(async (universe) => {
        await getCompanies(universe);
    })
})();
