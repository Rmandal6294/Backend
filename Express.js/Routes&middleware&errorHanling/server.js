// import express
import express from "express";

// create an express app
const app = express();

// define a route
app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

// define another route
app.get("/about", (req, res) => {
  res.send("<h1>About Us</h1><p>This is the about page.</p>");
});

// start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});