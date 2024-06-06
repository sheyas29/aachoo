const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Use your MySQL root password, if set
  database: 'cas_website'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// API endpoint to get links
app.get('/api/links', (req, res) => {
  const sql = 'SELECT name, url FROM links';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// API endpoint to get carousel images for first carousel
app.get('/api/carousel-images', (req, res) => {
  const sql = 'SELECT image_path, caption FROM carousel_images';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// API endpoint to get carousel images for second carousel
app.get('/api/carousel-images-2', (req, res) => {
  const sql = 'SELECT image_path, caption FROM carousel_images_2';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
