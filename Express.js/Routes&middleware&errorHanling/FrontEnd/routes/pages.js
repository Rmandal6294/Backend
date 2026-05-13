// import express from 'express';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Create a router instance
const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define routes
const pub = (file) => path.join(__dirname, '..', 'public', file);

router.get('/', (req, res) => res.sendFile(pub('index.html')));
router.get('/about', (req, res) => res.sendFile(pub('about.html')));
router.get('/courses', (req, res) => res.sendFile(pub('courses.html')));
router.get('/contact', (req, res) => res.sendFile(pub('contact.html')));

router.get('{*splat}', (req, res) => {
  res.status(404).send('404 Not Found');
});

export default router;
