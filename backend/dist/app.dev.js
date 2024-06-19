"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var mysql = require("mysql");

var path = require("path");

var app = express(); // MySQL connection setup

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  // Use your MySQL root password, if set
  database: "cas_website"
});
db.connect(function (err) {
  if (err) {
    throw err;
  }

  console.log("MySQL connected...");
}); // Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // Serve static files from the root directory

app.use(express["static"](path.join(__dirname, "..")));
app.use("/js", express["static"](path.join(__dirname, "..", "js")));
app.use("/css", express["static"](path.join(__dirname, "..", "css")));
app.use("/images", express["static"](path.join(__dirname, "..", "images"))); // Serve the main HTML file

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "index.html"));
}); // API endpoint to get CAS news

app.get("/api/cas-news", function (req, res) {
  var sql = "SELECT name, url FROM cas_news";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}); // API endpoint to get DRDO HQ news

app.get("/api/drdo-news", function (req, res) {
  var sql = "SELECT name, url FROM drdo_news";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}); // API endpoint to get quote

app.get("/api/quote", function (req, res) {
  var sql = "SELECT content FROM quotes ORDER BY RAND() LIMIT 1";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result[0]);
  });
}); // API endpoint to get security tip

app.get("/api/security-tip", function (req, res) {
  var sql = "SELECT content FROM security_tips ORDER BY RAND() LIMIT 1";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result[0]);
  });
}); // API endpoint to get daily Hindi word

app.get("/api/daily-hindi-word", function (req, res) {
  var sql = "SELECT content FROM daily_hindi_words ORDER BY RAND() LIMIT 1";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result[0]);
  });
}); // API endpoint to get carousel images

app.get("/api/carousel-images", function (req, res) {
  var sql = "SELECT image_path, caption FROM carousel_images";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}); // API endpoint to get second set of carousel images

app.get("/api/carousel-images-2", function (req, res) {
  var sql = "SELECT image_path, caption FROM carousel_images_2";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}); // API endpoint to get parts for the current year

app.get("/api/parts", function (req, res) {
  var _req$query = req.query,
      month = _req$query.month,
      year = _req$query.year;
  var sql = "SELECT * FROM parts WHERE MONTH(date) = ? AND YEAR(date) = ?";
  db.query(sql, [new Date("".concat(month, " 1, ").concat(year)).getMonth() + 1, year], function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}); // API endpoint to get parts for previous years

app.get("/api/parts/archive", function (req, res) {
  var _req$query2 = req.query,
      year = _req$query2.year,
      month = _req$query2.month;
  var sql = 'SELECT title, link, DATE_FORMAT(date, "%M/%Y") as date FROM parts WHERE year = ? AND month = ?';
  db.query(sql, [year, month], function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}); // API endpoint to get available years and months for the archive

app.get("/api/parts/archive/years-months", function (req, res) {
  var currentYear = new Date().getFullYear();
  var sql = "\n    SELECT DISTINCT YEAR(date) as year, DATE_FORMAT(date, '%M') as month\n    FROM parts\n    WHERE year < ?\n    ORDER BY year DESC, MONTH(date) DESC\n  ";
  db.query(sql, [currentYear], function (err, result) {
    if (err) throw err;
    var yearsMonths = {};
    result.forEach(function (row) {
      if (!yearsMonths[row.year]) {
        yearsMonths[row.year] = [];
      }

      yearsMonths[row.year].push(row.month);
    });
    var data = Object.keys(yearsMonths).map(function (year) {
      return {
        year: year,
        months: yearsMonths[year]
      };
    });
    res.json(data);
  });
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});