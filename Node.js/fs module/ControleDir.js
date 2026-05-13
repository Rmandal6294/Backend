import fs from "fs/promises"

// Check the File/Directory if exist
const isExist = async (dirName) => {
    try {
        await fs.access(dirName);
        console.log("Directory Exits");
    } catch {
        console.log("Directory Not exits.");
        return -1;
    }
}
isExist("testDir1");


// Create Directory using fs module
const makeAnDirectory = async () => {

    try {
        await fs.mkdir("testDir1");
        console.log("Directory created Successfully.");
    } catch {
        console.log("Directory Already Exits");
    }
}
makeAnDirectory();

// Delete  Empty Directory
const deleteMyDirectory = async () => {
    try {
        await fs.rmdir("testDir1"); // directory must be empty before deleting otherwise is not work.
        console.log("Directory Deleted Successfully.");
    } catch {
        console.log("Directory not exits or Directory is not empty");
    }
}
deleteMyDirectory();


// create Nested Directories (recursive)
const nestedDir = async () => {
    try {
        await fs.mkdir("parent/child/grandchild", { recursive: true });
        console.log("Nested Directories Created.");
    } catch {
        console.log("Directory already Exits. Or Some problem occur. Try Again!");
    }
}
nestedDir();

// Delete Directory with all file and folder and sub folder
const allDeleteDir = async () => {
    try {
        await fs.rm("parent", { recursive: true, force: true });
        console.log("Deleted Directory Successfully.")
    } catch {
        console.log("Directory Not Exits. Or Some problem occur. Try Again!");
    }
}
allDeleteDir();

//read Directory
const readDirectory = async () => {
    try {
        const content = await fs.readdir("testDir1");
        console.log("Reading:->\n", content);
    } catch {
        console.log("Directory Not Exits. OR May be Other Problem.");
    }
}
readDirectory();

// Without Delete an Directory Emptying the Directory
import path from 'path';

const emptyDir = async (dirPath) => {
    try {
        // 1. Check if the directory exists and is actually a directory
        const stats = await fs.stat(dirPath);
        if (!stats.isDirectory()) {
            console.error("Path exists but is not a directory.");
            return;
        }
        const items = await fs.readdir(dirPath);
        await Promise.all(
            items.map(item => {
                const fullPath = path.join(dirPath, item);
                return fs.rm(fullPath, { recursive: true, force: true });
            })
        );
        console.log(`Successfully emptied: ${dirPath}`);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            console.error("Directory does not exist....");
        } else {
            console.error("An error occurred:", error.message);
        }
    }
};

emptyDir('./testDir');

// ------------------- Deleting Multiple Directory At Once ------------------
const directories = [
    "testDir1",
    "parent"
    // can give many more
];

const deleteAllDir = async () => {
    try {
        await Promise.all(
            directories.map(dir => fs.rm(dir, { recursive: true, force: true }))
        );
        console.log("All Directories Deleted Successfully....");
    } catch {
        console.log("Some Directory Not Exits. OR May be Another Problem occur....");

    }
}
deleteAllDir();

// ------------------ rename Directory ------------------
const renameDir = async () => {
    try {
        await fs.rename("testDir2", "renamedDir");
        console.log("Directory Renamed Successfully.");
    } catch {
        console.log("Directory Not Exits. OR May be Another Problem occur....");
    }
}
renameDir();

// ------------------ Move Directory ------------------
const moveDir = async () => {
    try {
        await fs.rename("testDir3", "movedDir");    
        console.log("Directory Moved Successfully.");
    } catch {
        console.log("Directory Not Exits. OR May be Another Problem occur....");
    }
}
moveDir();

// ------------------- File/Directory info. ------------------
const infoDir = async () => {
    try {
        const stats = await fs.stat("movedDir");    
        console.log("Directory Info.:-? ", stats);
    } catch {
        console.log("Directory Not Exits. OR May be Another Problem occur..../");
    }
}
infoDir();