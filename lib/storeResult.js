const {writeFile} = require('fs')
const store = (fileName, result) => {
    return new Promise((resolve, reject) => {
        writeFile(fileName,JSON.stringify(result, null, 2), (error) => {
            if (error) {
                reject(error)
            } 

            resolve()
        });
    });

}

module.exports = store;