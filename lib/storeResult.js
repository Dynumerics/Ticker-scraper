const {writeFile} = require('fs')
const store = (fileName, result) => {
    return new Promise((resolve, reject) => {
        const fileContent = {
            update: Date.now(),
            companies: result
        }
        writeFile(fileName,JSON.stringify(fileContent, null, 2), (error) => {
            if (error) {
                reject(error)
            } 

            resolve()
        });
    });

}

module.exports = store;