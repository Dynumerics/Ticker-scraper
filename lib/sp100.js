const parser = function(done) {
    const constituentsList = [];
    const constituentsTable = document.getElementById("constituents");
    const tableBody = constituentsTable.getElementsByTagName("tbody");
    const tableRows = tableBody[0].getElementsByTagName("tr");
    for (let row of tableRows) {
      const rowData = row.getElementsByTagName("td");
  
      constituentsList.push({
        ticker: rowData[0].innerText,        
        name: rowData[1].innerText,      
        sector: rowData[2].innerText  
      })
    }

    done(constituentsList); 
  };
const url = 'https://en.wikipedia.org/wiki/S%26P_100';
const selector = 'table#constituents tbody tr';
const path = './result/sp100.json'

module.exports = {
    parser,
    url,
    selector,
    path
}