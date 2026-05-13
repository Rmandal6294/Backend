import fs from 'fs';
import path from 'path';

const filePath = "C:/Users/ACER/Downloads";
const fileToMove = []
const extensionsMaps = {
    "Images": ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
    "Documents": ['.pdf', '.docx', '.txt', '.xlsx'],
    "Videos": ['.mp4', '.avi', '.mkv', '.mov'],
    "Music": ['.mp3', '.wav', '.aac', '.flac'],
    "Archives": ['.zip', '.rar', '.tar', '.gz'],
    "Applications": ['.exe', '.dmg', '.deb', '.rpm'],
    "Code": ['.js', '.py', '.java', '.cpp', '.html', '.css'],
    "Others": []
}

const readFiles = path => {
    try{
        const data = fs.readdirSync(path, 'utf-8');
        return arrangeFiles(data);
    } catch (err) {
        console.error(err);
    } finally {        
        console.log("File reading process completed.");
    }
}

const arrangeFiles = data => {
    data.forEach(item => {
        const fullPath = path.join(filePath, item);
        const stats = fs.statSync(fullPath);
        if(stats.isFile()) {
            fileToMove.push(item);
        }
    })
}

const organizeFiles = () => {
    return fileToMove.map(fileName => {
        const extensionName = path.extname(fileName).toLowerCase();
        const folderName = Object.keys(extensionsMaps).find(key => extensionsMaps[key].includes(extensionName)) || "Others";

        return {
            fileName : fileName,
            category : folderName
        };
    })
}

const directoryCreation = () => {
    const organziedFiles = organizeFiles();
    const categories = [...new Set(organziedFiles.map(f => f.category))];

    categories.forEach(category => {
        const categoryPath = path.join(filePath, category);
        if(!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath);
        } else {
            console.log(`Directory ${category} already exists.`);
        }
    })
}

const moveFiles = () => {
    const organziedFiles = organizeFiles();
    organziedFiles.forEach(file => {
        const sourcePath = path.join(filePath, file.fileName);
        const destinationPath = path.join(filePath, file.category, file.fileName);
        
        try {
            fs.renameSync(sourcePath, destinationPath);
            console.log(`Moved ${file.fileName} to ${file.category}`);
        } catch (err) {
            console.error(`Error moving file ${file.fileName}:`, err);
        }
    })
}


const main = () => {
    readFiles(filePath);
    directoryCreation();
    moveFiles();
}
main();