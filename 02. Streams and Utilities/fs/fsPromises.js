const fs = require('fs/promises'); 

const readFilePromise = fs.readFile('./input.txt', 'utf-8');
readFilePromise.then((data) => {
    return fs.writeFile('./output.txt', data, "utf-8"); 
}).then(() => {
    console.log('File is saved!');
}).catch(er => console.log(err));

