import os from 'os'

console.log("PlatFrom: " + os.platform())
console.log("CPU arc: " + os.arch())
console.log("Total Memory: " + os.totalmem())
console.log("Free Memory: " + os.freemem())
console.log("Uptime: " + os.uptime())
console.log("Home Directory: " + os.homedir())
console.log("Host: " + os.hostname())
console.log("Network Interface: ", os.networkInterfaces())
console.log(os.cpus())