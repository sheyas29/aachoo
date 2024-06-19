document.addEventListener("DOMContentLoaded", function () {
  const monthYear = document.getElementById("month-year");
  const doPartsContent = document.getElementById("do-parts-content");
  const monthYearDropdown = document.getElementById("month-year-dropdown");

  function loadParts(month, year) {
    // Clear the current content
    doPartsContent.innerHTML = "";

    // Fetch parts for the given month and year
    fetch(`/api/parts?month=${month}&year=${year}`)
      .then((response) => response.json())
      .then((parts) => {
        parts.forEach((part) => {
          const partBox = document.createElement("div");
          partBox.className = "col-md-4 do-part-box";
          partBox.innerHTML = `<h3>${part.title}</h3>`;
          partBox.onclick = () => (window.location.href = part.link);
          doPartsContent.appendChild(partBox);
        });
      })
      .catch((error) => {
        console.error("Error fetching parts:", error);
      });
  }

  function adjustMonthYear(monthOffset) {
    const [currentMonth, currentYear] = monthYear.textContent.split("/");
    const currentDate = new Date(`${currentMonth} 1, ${currentYear}`);
    currentDate.setMonth(currentDate.getMonth() + monthOffset);

    const newMonth = currentDate.toLocaleString("default", { month: "long" });
    const newYear = currentDate.getFullYear();

    monthYear.textContent = `${newMonth}/${newYear}`;
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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let dropdownHTML = "";

    months.forEach((month) => {
      dropdownHTML += `<li><a class="dropdown-item" href="#">${month}/${currentYear}</a></li>`;
    });

    monthYearDropdown.innerHTML = dropdownHTML;

    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const [month, year] = this.textContent.split("/");
        monthYear.textContent = `${month}/${year}`;
        loadParts(month, year);
      });
    });
  }

  // Set current month and year as default
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  monthYear.textContent = `${currentMonth}/${currentYear}`;

  populateDropdown();

  document
    .getElementById("archive-button")
    .addEventListener("click", openArchive);
  document.getElementById("admin-button").addEventListener("click", openAdmin);

  window.prevMonth = prevMonth;
  window.nextMonth = nextMonth;

  // Initial load with current month and year
  loadParts(currentMonth, currentYear);
});
