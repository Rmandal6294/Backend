// import express
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// create an express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add static files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

// set the view engine to ejs
app.set("view engine", "ejs");

// define a route for the home page
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

// create a route for login page
app.get("/login", (req, res) => {
  res.render("Login", { title: "Login Page" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // For demonstration purposes, we will just check if the username and password are "admin"
  if (username === "admin" && password === "admin") {
    res.render("Dashboard", { title: "Dashboard", username });
  } else {
    res.render("Login", { title: "Login Page", error: "Invalid username or password" });
  }
});

// listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});