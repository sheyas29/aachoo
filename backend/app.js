const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Use your MySQL root password, if set
  database: "cas_website",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, "..")));
app.use("/js", express.static(path.join(__dirname, "..", "js")));
app.use("/css", express.static(path.join(__dirname, "..", "css")));
app.use("/images", express.static(path.join(__dirname, "..", "images")));

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// API endpoint to get CAS news
app.get("/api/cas-news", (req, res) => {
  const sql = "SELECT name, url FROM cas_news";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// API endpoint to get DRDO HQ news
app.get("/api/drdo-news", (req, res) => {
  const sql = "SELECT name, url FROM drdo_news";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// API endpoint to get quote
app.get("/api/quote", (req, res) => {
  const sql = "SELECT content FROM quotes ORDER BY RAND() LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// API endpoint to get security tip
app.get("/api/security-tip", (req, res) => {
  const sql = "SELECT content FROM security_tips ORDER BY RAND() LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// API endpoint to get daily Hindi word
app.get("/api/daily-hindi-word", (req, res) => {
  const sql = "SELECT content FROM daily_hindi_words ORDER BY RAND() LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// API endpoint to get carousel images
app.get("/api/carousel-images", (req, res) => {
  const sql = "SELECT image_path, caption FROM carousel_images";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// API endpoint to get second set of carousel images
app.get("/api/carousel-images-2", (req, res) => {
  const sql = "SELECT image_path, caption FROM carousel_images_2";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// API endpoint to get parts for the current year
app.get("/api/parts", (req, res) => {
  const { month, year } = req.query;
  const sql = "SELECT * FROM parts WHERE MONTH(date) = ? AND YEAR(date) = ?";
  db.query(
    sql,
    [new Date(`${month} 1, ${year}`).getMonth() + 1, year],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

// API endpoint to get parts for previous years
app.get("/api/parts/archive", (req, res) => {
  const { year, month } = req.query;
  const sql =
    'SELECT title, link, DATE_FORMAT(date, "%M/%Y") as date FROM parts WHERE year = ? AND month = ?';
  db.query(sql, [year, month], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// API endpoint to get available years and months for the archive
app.get("/api/parts/archive/years-months", (req, res) => {
  const currentYear = new Date().getFullYear();
  const sql = `
    SELECT DISTINCT YEAR(date) as year, DATE_FORMAT(date, '%M') as month
    FROM parts
    WHERE year < ?
    ORDER BY year DESC, MONTH(date) DESC
  `;
  db.query(sql, [currentYear], (err, result) => {
    if (err) throw err;

    const yearsMonths = {};
    result.forEach((row) => {
      if (!yearsMonths[row.year]) {
        yearsMonths[row.year] = [];
      }
      yearsMonths[row.year].push(row.month);
    });

    const data = Object.keys(yearsMonths).map((year) => ({
      year: year,
      months: yearsMonths[year],
    }));

    res.json(data);
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
