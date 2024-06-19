"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var archiveContent = document.getElementById("archive-content");
  var archiveSidebar = document.getElementById("archive-sidebar");

  function loadArchiveParts(year, month) {
    // Fetch parts for the given year and month
    fetch("/api/parts/archive?year=".concat(year, "&month=").concat(month)).then(function (response) {
      return response.json();
    }).then(function (parts) {
      archiveContent.innerHTML = ""; // Clear current content

      if (parts.length > 0) {
        var partsRow = document.createElement("div");
        partsRow.className = "row";
        parts.forEach(function (part) {
          var partBox = document.createElement("div");
          partBox.className = "col-md-4 do-part-box";
          partBox.innerHTML = "<h3>".concat(part.title, "</h3>");

          partBox.onclick = function () {
            return window.location.href = part.link;
          };

          partsRow.appendChild(partBox);
        });
        archiveContent.appendChild(partsRow);
      } else {
        archiveContent.innerHTML = "<p>No parts found for this period.</p>";
      }
    })["catch"](function (error) {
      console.error("Error fetching archive parts:", error);
    });
  }

  function populateSidebar() {
    // Fetch the years and months available
    fetch("/api/parts/archive/years-months").then(function (response) {
      return response.json();
    }).then(function (data) {
      var sidebarHTML = "";
      data.forEach(function (yearData) {
        sidebarHTML += "\n            <li class=\"list-group-item year-item\" data-year=\"".concat(yearData.year, "\">\n              ").concat(yearData.year, "\n              <ul class=\"list-group\">\n                ").concat(yearData.months.map(function (month) {
          return "\n                  <li class=\"list-group-item month-item\" data-year=\"".concat(yearData.year, "\" data-month=\"").concat(month, "\">").concat(month, "</li>\n                ");
        }).join(""), "\n              </ul>\n            </li>\n          ");
      });
      archiveSidebar.innerHTML = sidebarHTML;
      document.querySelectorAll(".year-item").forEach(function (yearItem) {
        yearItem.addEventListener("click", function () {
          var year = this.getAttribute("data-year");
          this.querySelectorAll(".month-item").forEach(function (monthItem) {
            monthItem.classList.toggle("active");
          });
        });
      });
      document.querySelectorAll(".month-item").forEach(function (item) {
        item.addEventListener("click", function (e) {
          e.stopPropagation(); // Prevent year item click event

          var year = this.getAttribute("data-year");
          var month = this.getAttribute("data-month");
          loadArchiveParts(year, month);
          document.querySelectorAll(".list-group-item").forEach(function (i) {
            return i.classList.remove("active");
          });
          this.classList.add("active");
        });
      });
    })["catch"](function (error) {
      console.error("Error fetching years and months:", error);
    });
  } // Initial load


  populateSidebar();
});