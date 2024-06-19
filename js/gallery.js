document.addEventListener("DOMContentLoaded", function () {
  // Fetch images for the carousel
  fetch("/api/carousel-images-gallery")
    .then((response) => response.json())
    .then((data) => {
      const carouselInner = document.getElementById("carouselInner");
      carouselInner.innerHTML = "";

      data.forEach((image, index) => {
        const activeClass = index === 0 ? "active" : "";
        const carouselItem = `
            <div class="carousel-item ${activeClass}">
              <img src="${image.image_path}" class="d-block w-100" alt="${image.caption}">
            </div>`;

        carouselInner.innerHTML += carouselItem;
      });
    })
    .catch((error) => console.error("Error fetching carousel images:", error));
});
