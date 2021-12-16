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
        sector: rowData[3].innerText  
      })
    }

    done(constituentsList); 
  };
const url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies';
const selector = 'table#constituents tbody tr';
const path = './result/sp500.json'

module.exports = {
    parser,
    url,
    selector,
    path
}