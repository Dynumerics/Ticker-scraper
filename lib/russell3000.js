const PDFParser = require("pdf2json");
const pdfParser = new PDFParser();
const fs = require('fs');
const request = require("request-promise-native");

const url = "https://content.ftserussell.com/sites/default/files/ru3000_membershiplist_20210628.pdf";
// const url = "https://www.ftserussell.com/files/support-document/2021-membership-list-r3000";
const path = './result/russell3000.json'

const savePdf = async (url, path = './result/russell3000.pdf') => {
    let pdfBuffer = await request.get({
        uri: url, 
        encoding: null
    });
    console.log("Writing downloaded PDF file to " + path + "...");
    fs.writeFileSync(path, pdfBuffer);
};

const loadPdfData = (path = './result/russell3000.pdf') => {
    pdfParser.loadPDF(path);

    return new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataReady", pdfData => {
            const rusell3000 = pdfData.Pages.map((page) => {
                const texts = page.Texts.map((text) => {
                    const pdfText = text.R[0].T; 
                    return text.R[0].S !== -1 ? pdfText : undefined;
                }).filter(element => element).reduce((accumulator, _element, index, originalArray)=> {
                    const isOdd = index % 2 === 0;
        
                    if (isOdd) {
                        accumulator.push({
                            ticker: originalArray[index + 1],
                            name: decodeURI(originalArray[index])
                        })
                    }
        
                    return accumulator;
                }, []);
        
                return texts;
            }).reduce((accumulator, companies) => {
                return accumulator.concat(companies);
            }, []);
            resolve(rusell3000);
        });
    });
};

module.exports = {
    name: "russell3000",
    url,
    path,
    savePdf,
    loadPdfData
}