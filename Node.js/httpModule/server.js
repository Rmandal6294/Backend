import http from 'http';

// create a server ----
const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello World</h1>');
    res.end();
})

// listen to the server ----
server.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000');
})

