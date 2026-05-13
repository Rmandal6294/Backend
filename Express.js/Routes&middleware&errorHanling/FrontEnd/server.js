import express from 'express';
import path from 'path';
import pageRoutes from './routes/pages.js';
import { fileURLToPath } from 'url';

// create express app
const app = express();

// Define the port
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use the logger middleware for all routes
app.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`${currentTime} - ${req.method} ${req.url}`);
  next(); // Call the next middleware or route handler
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the page routes
app.use('/', pageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong! Please try again later.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
