//! --------- Synchronous File operations using File Handlers in fs module ---------
import fs from 'fs';

// Creating a file handler
const fileHandle = fs.openSync('fileHandleExample.txt', 'w+');
console.log('File handler created:', fileHandle);

// Writing to the file
fs.writeSync(fileHandle, 'This is some content written.\n');
console.log('written using file handler.');

fs.writeSync(fileHandle, 'Append line.\n');
console.log('written using file handler.');

// Reading from the file
const content = fs.readFileSync('fileHandleExample.txt', 'utf8');
console.log('\nread using file handler:\n', content);

// Closing the file handler
fs.closeSync(fileHandle);
console.log('File handler closed.');

// Deleting the file 
fs.unlinkSync('fileHandleExample.txt');
console.log('File deleted using file handler.');

console.log('File operations using file handler completed.\n');



//! -------- Asynchronous File operations using File Handlers in fs module ---------



import {open} from 'fs/promises';

const filepath = 'asyncFileHandleExample.txt';

const fileOperations = async () => {
    
    //creating a file handler (open file)
    const fileHandle = await open(filepath, 'a+');
    console.log('Asynchronous File handler created:', fileHandle.fd);

    // Writing to the file
    await fileHandle.write('This is some async content written.\n');
    console.log('Asynchronously written using file handler.');

    await fileHandle.write('Async Append line.\n');
    console.log('Asynchronously written using file handler.');

    // Close the file handle
    await fileHandle.close();
    console.log('File handler closed.');
}

fileOperations();


//! ------------- Deleting Multiple File At Once ------------------
import { unlink } from 'fs/promises';

const files = [
    "example.txt",
    "asyncFileHandleExample.txt"
    // can give many more
];

const deleteAll = async () => {
    try{
        await Promise.all(
            files.map(file=>unlink(file))
        );
        console.log("All files Deleted Successfully.");
    } catch(err) {
        console.log("Error Deleting Files.", err);
    }
}
deleteAll();