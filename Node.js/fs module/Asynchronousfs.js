//!  ----------- Asynchronous fs module -----------

// ------------> CommonJS (Default in Node.js)
// const fs = require('fs');

// ------------> ES Modules (Node.js 14+ with "type": "module" in package.json)
// import fs from 'fs';

//  --------> Promise-based API
// const fs = require('fs').promises;
// Or with destructuring
// const { readFile, writeFile } = require('fs').promises
import {readFile as rf, writeFile as wf, appendFile as af, unlink as df} from 'fs/promises';


// Reading a file asynchronously
const readMyFile = async () => {
    try{
        const data = await rf('example.txt', 'utf8'); 
        console.log("Reading: ", data);
    } catch (err) {
        console.error('Error reading file:', err);
    } finally{
        console.log("Reading File Operation Complete.\n")
    }
}
readMyFile();


// Writing to a file asynchronously
const writeMyFile = async () => {
    try{
        await wf('example.txt', 'This is some new content.', 'utf8');
        console.log("File written successfully.");
    } catch (err) {
        console.error('Error writing file:', err);
    } finally{
        console.log("Writing File Operation Complete.\n");
    }
}
writeMyFile();


// Appending to a file asynchronously
const appendMyFile = async () => {
    try{
        await af ("example.txt", "\nThis is an Append line.", "utf-8");
        console.log("File appended successfully.");
    } catch (err) {
        console.error('Error appending file:', err);
    } finally{
        console.log("Appending File Operation Complete.\n");
    }
}
appendMyFile();

// Deleting a file asynchronously
const deleteMyFile = async () => {
    try{
        await df('example.txt');
        console.log("File deleted successfully.");
    }catch (err) {
        console.error('Error deleting file:', err);
    } finally{
        console.log("Deleting File Operation Complete.\n");
    }
}
deleteMyFile();