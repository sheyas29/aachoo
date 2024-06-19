"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

document.addEventListener("DOMContentLoaded", function () {
  var monthYear = document.getElementById("month-year");
  var doPartsContent = document.getElementById("do-parts-content");
  var monthYearDropdown = document.getElementById("month-year-dropdown");

  function loadParts(month, year) {
    // Clear the current content
    doPartsContent.innerHTML = ""; // Fetch parts for the given month and year

    fetch("/api/parts?month=".concat(month, "&year=").concat(year)).then(function (response) {
      return response.json();
    }).then(function (parts) {
      parts.forEach(function (part) {
        var partBox = document.createElement("div");
        partBox.className = "col-md-4 do-part-box";
        partBox.innerHTML = "<h3>".concat(part.title, "</h3>");

        partBox.onclick = function () {
          return window.location.href = part.link;
        };

        doPartsContent.appendChild(partBox);
      });
    })["catch"](function (error) {
      console.error("Error fetching parts:", error);
    });
  }

  function adjustMonthYear(monthOffset) {
    var _monthYear$textConten = monthYear.textContent.split("/"),
        _monthYear$textConten2 = _slicedToArray(_monthYear$textConten, 2),
        currentMonth = _monthYear$textConten2[0],
        currentYear = _monthYear$textConten2[1];

    var currentDate = new Date("".concat(currentMonth, " 1, ").concat(currentYear));
    currentDate.setMonth(currentDate.getMonth() + monthOffset);
    var newMonth = currentDate.toLocaleString("default", {
      month: "long"
    });
    var newYear = currentDate.getFullYear();
    monthYear.textContent = "".concat(newMonth, "/").concat(newYear);
    loadParts(newMonth, newYear);
  }

  function prevMonth() {
    adjustMonthYear(-1);
  }

  function nextMonth() {
    adjustMonthYear(1);
  }

  function openArchive() {
    window.open("/archive.html", "_blank");
  }

  function openAdmin() {
    window.open("/admin.html", "_blank");
  }

  function populateDropdown() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dropdownHTML = "";
    months.forEach(function (month) {
      dropdownHTML += "<li><a class=\"dropdown-item\" href=\"#\">".concat(month, "/").concat(currentYear, "</a></li>");
    });
    monthYearDropdown.innerHTML = dropdownHTML;
    document.querySelectorAll(".dropdown-item").forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();

        var _this$textContent$spl = this.textContent.split("/"),
            _this$textContent$spl2 = _slicedToArray(_this$textContent$spl, 2),
            month = _this$textContent$spl2[0],
            year = _this$textContent$spl2[1];

        monthYear.textContent = "".concat(month, "/").concat(year);
        loadParts(month, year);
      });
    });
  } // Set current month and year as default


  var currentDate = new Date();
  var currentMonth = currentDate.toLocaleString("default", {
    month: "long"
  });
  var currentYear = currentDate.getFullYear();
  monthYear.textContent = "".concat(currentMonth, "/").concat(currentYear);
  populateDropdown();
  document.getElementById("archive-button").addEventListener("click", openArchive);
  document.getElementById("admin-button").addEventListener("click", openAdmin);
  window.prevMonth = prevMonth;
  window.nextMonth = nextMonth; // Initial load with current month and year

  loadParts(currentMonth, currentYear);
});