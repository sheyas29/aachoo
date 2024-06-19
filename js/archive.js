document.addEventListener("DOMContentLoaded", function () {
  const archiveContent = document.getElementById("archive-content");
  const archiveSidebar = document.getElementById("archive-sidebar");

  function loadArchiveParts(year, month) {
    // Fetch parts for the given year and month
    fetch(`/api/parts/archive?year=${year}&month=${month}`)
      .then((response) => response.json())
      .then((parts) => {
        archiveContent.innerHTML = ""; // Clear current content

        if (parts.length > 0) {
          const partsRow = document.createElement("div");
          partsRow.className = "row";

          parts.forEach((part) => {
            const partBox = document.createElement("div");
            partBox.className = "col-md-4 do-part-box";
            partBox.innerHTML = `<h3>${part.title}</h3>`;
            partBox.onclick = () => (window.location.href = part.link);
            partsRow.appendChild(partBox);
          });

          archiveContent.appendChild(partsRow);
        } else {
          archiveContent.innerHTML = "<p>No parts found for this period.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching archive parts:", error);
      });
  }

  function populateSidebar() {
    // Fetch the years and months available
    fetch("/api/parts/archive/years-months")
      .then((response) => response.json())
      .then((data) => {
        let sidebarHTML = "";

        data.forEach((yearData) => {
          sidebarHTML += `
            <li class="list-group-item year-item" data-year="${yearData.year}">
              ${yearData.year}
              <ul class="list-group">
                ${yearData.months
                  .map(
                    (month) => `
                  <li class="list-group-item month-item" data-year="${yearData.year}" data-month="${month}">${month}</li>
                `
                  )
                  .join("")}
              </ul>
            </li>
          `;
        });

        archiveSidebar.innerHTML = sidebarHTML;

        document.querySelectorAll(".year-item").forEach((yearItem) => {
          yearItem.addEventListener("click", function () {
            const year = this.getAttribute("data-year");
            this.querySelectorAll(".month-item").forEach((monthItem) => {
              monthItem.classList.toggle("active");
            });
          });
        });

        document.querySelectorAll(".month-item").forEach((item) => {
          item.addEventListener("click", function (e) {
            e.stopPropagation(); // Prevent year item click event
            const year = this.getAttribute("data-year");
            const month = this.getAttribute("data-month");
            loadArchiveParts(year, month);
            document
              .querySelectorAll(".list-group-item")
              .forEach((i) => i.classList.remove("active"));
            this.classList.add("active");
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching years and months:", error);
      });
  }

  // Initial load
  populateSidebar();
});
