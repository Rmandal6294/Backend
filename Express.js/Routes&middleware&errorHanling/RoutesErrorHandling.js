// import express from 'express';
import express from "express";

// create an express app
const app = express();

// define a middleware 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // call the next middleware or route handler
})

// another middleware 
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// define a route
app.get("/", (req, res) => {
    res.send("<h1>Server is running!........</h1>");
});

// define another route - post
app.post("/submit", (req, res) => {
    const { name } = req.body;
    const { age } = req.body;

    if (!name || !age) {
        const err = new Error("Name and age are required");
        err.statusCode = 400;
        return next(err); // pass the error to the error handling middleware
    }
    res.send(`<h1>Hello, ${name}! - you are ${age} years old</h1>`);
});

// define a middleware for handling 404 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

// start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});