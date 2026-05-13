//import express
import express from "express";
import path from "path";

//create an express app
const app = express();

//define a port
const PORT = 3000;

//middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//define a route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

//define a dynamic route for user profiles
app.get("/:username/:password", (req, res) => {
  const { username, password } = req.params;
  res.send(`<h1>User Profile</h1><p>Username: ${username}</p><p>Password: ${password}</p>`);
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});