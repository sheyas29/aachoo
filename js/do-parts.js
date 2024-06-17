document.addEventListener("DOMContentLoaded", function () {
  const monthYear = document.getElementById("month-year");
  const doPartsContent = document.getElementById("do-parts-content");

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

  // Remove date picker event listener
  monthYear.removeEventListener("click", function () {});

  window.prevMonth = prevMonth;
  window.nextMonth = nextMonth;

  // Initial load
  loadParts("May", "2024");
});
