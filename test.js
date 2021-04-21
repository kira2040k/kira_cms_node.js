const fs = require('fs');

const readFile = (fileName, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, encoding, (err, data) => {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    });
}

readFile('./config/config.txt','utf-8')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
console.log(data)