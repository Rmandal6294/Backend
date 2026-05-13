import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;

// Helper function to serve HTML files ----
const serveHtml = (res, filePath) => {
    fs.readFile(filePath, 'utf8', (err, data)=>{
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 - Not Found! </h1>');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    })
}

// create a server ----
const server = http.createServer((req, res)=>{
    if(req.url === '/' || req.url === '/home'){
        serveHtml(res, path.join('Test_Html', 'index.html'))
    } else {
        serveHtml(res, path.join('Test_Html', `${req.url}.html`) )
    }
});

// listen to the server ----
server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
