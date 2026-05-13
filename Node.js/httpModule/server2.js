import http from 'http'
import EventEmitter from 'events'

// create a custom event emitter ----
class myLogger extends EventEmitter{}
const logger = new myLogger();

// create a event listener for 'requestReceived' ----
logger.on('requestReceived', (url, method)=>{
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${method} request to: ${url}`);
})

// create a server ----
const server = http.createServer((req, res)=>{
    // emit the 'requestReceived' event ----
    logger.emit('requestReceived', req.url, req.method);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello World</h1>');
    res.end('<h2>Event emitted and logged!</h2>');
})

// listen to the server ----
server.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000');
})
