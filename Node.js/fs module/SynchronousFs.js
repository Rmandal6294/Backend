//! ------------ Synchronous Fs Module ------------

// ------------> CommonJS (Default in Node.js)
// const fs = require('fs');

// ------------> ES Modules (Node.js 14+ with "type": "module" in package.json)
// import fs from 'fs';

//  --------> Promise-based API
// const fs = require('fs').promises;
// Or with destructuring
// const { readFileSync, writeFileSync, appendFileSync, unlinkSync } = require('fs');
import {readFileSync as rfs, writeFileSync as wfs, appendFileSync as afs, unlinkSync as dfs} from 'fs';


// Reading a file synchronously
const readMyFileSync = () => {
    try {
        const data = rfs ("example.txt", "utf-8");
        console.log("Reading Data:-> " + data);
    } 
    catch (err) {
        console.log("Error occur:-? ", err);
    } 
    finally {
        console.log("Reading File Operation Complete.\n");
    }
}
readMyFileSync();


// Writing to a file synchronously
const writeMyFileSync = () => {

    try {
        wfs ("example.txt", "This is some new content.", "utf-8");
        console.log("File written successfully.");
    }
    catch (err) {
        console.log("Error occur:-? ", err);
    } 
    finally {
        console.log("Writing File Operation Complete.\n");
    }
}
writeMyFileSync();


// Appending to a file synchronously
const appendMyFileSync = () => {
    try{
        const data = { name: 'John', age: 30, city: 'New York' };
        afs ("example.txt", "\n" + JSON.stringify(data, null, 2), "utf-8");
        console.log("File appended successfully.");
    } 
    catch (err) {
        console.error('Error appending file:', err);
    } 
    finally{
        console.log("Appending File Operation Complete.\n");
    }
}
appendMyFileSync();


// deleting a file synchronously
const deleteMyFileSync = () => {
    try{
        dfs ('example.txt');
        console.log("File deleted successfully.");
    }
    catch (err) {
        console.error('Error deleting file:', err);
    }
    finally{
        console.log("Deleting File Operation Complete.\n");
    }
}
deleteMyFileSync();
