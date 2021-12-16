const webdriverio = require('./lib/webdriverio');
const storeResults = require('./lib/storeResult');

const sp100 = require('./lib/sp100');
const sp500 = require('./lib/sp500');
const russell3000 = require('./lib/russell3000');

const getCompanies = async (universe) => {
    let companies = [];
    if (universe.name === "russell3000") {
        // const pdfUrl = await webdriverio.getRedirectedUrl(universe.url);
        await universe.savePdf(universe.url);
        companies = await universe.loadPdfData();
    } else {
        console.log(universe.url);
        companies = await webdriverio.getCompanies(universe.url, universe.parser); 
    }
    console.log(companies.length);
    await storeResults(universe.path, companies);
}

(async() => {
    [
        sp100, 
        sp500,
        russell3000
    ].forEach(async (universe) => {
        await getCompanies(universe);
    })
})();
