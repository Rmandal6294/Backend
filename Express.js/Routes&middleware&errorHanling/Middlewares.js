// import express from 'express';
import express from "express";

// create an express app
const app = express();

// define a middleware 
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next(); // call the next middleware or route handler
})

// define another type of middleware built in middleware
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// define a route
app.get("/", (req, res) => {
  res.send("<h1>Hello, World! - Middleware In</h1>");
});

// define another route - post
app.post("/submit", (req, res) => {
  const { name } = req.body;
  res.send(`<h1>Hello, ${name}! - Middleware In</h1>`);
});

// start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});