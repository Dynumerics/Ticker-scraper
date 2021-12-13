const parser = (tableRows) => {
    let rowList = []   
    tableRows.forEach(row => {
        let record = {'ticker' : '','name' :'', 'sector' : ''}
        const tdList = Array.from(row.querySelectorAll('td'), column => column.innerText); // getting textvalue of each column of a row and adding them to a list.
        record.ticker = tdList[0];        
        record.name = tdList[1];       
        record.sector = tdList[2];   
        if(tdList.length >= 3){         
            rowList.push(record)
        }
    });
    return rowList;
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