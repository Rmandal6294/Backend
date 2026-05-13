import process from 'process';

console.log("Current working directory: " + process.cwd());
console.log("Process ID: " + process.pid);
// console.log("Current user ID: " + process.getuid());
// console.log("Current group ID: " + process.getgid());
console.log("Node.js version: " + process.version);
console.log("Platform: " + process.platform);
console.log("Environment Variables: ", process.env);
console.log("Memory Usage: ", process.memoryUsage());
console.log("Uptime: " + process.uptime() + " seconds");
console.log("Command-line arguments: ", process.argv);

// Getting user input from command line arguments
const input = process.argv[2];
console.log("Your input is:", input);
// How to run it: node filename.js Alex like: - node ProcessModule ranit



process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit with a failure code
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1); // Exit with a failure code
});
process.on('exit', (code) => {
    console.log(`Process exiting with code: ${code}`);
});


