document.addEventListener("DOMContentLoaded", function () {
  function setupCarousel(carouselInnerId, images) {
    const carouselInner = document.getElementById(carouselInnerId);

    images.forEach((image, index) => {
      const activeClass = index === 0 ? "active" : "";
      const carouselItem = `
        <div class="carousel-item ${activeClass}">
          <img src="${image.image_path}" class="d-block w-100 carousel-image border-image" alt="${image.caption}">
        </div>`;

      carouselInner.innerHTML += carouselItem;
    });

    // Add event listeners to images
    const carouselImages = document.querySelectorAll(
      `#${carouselInnerId} .carousel-image`
    );
    carouselImages.forEach((img) => {
      img.addEventListener("click", function () {
        showModal(this.src);
      });
    });
  }

  function showModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    modalImg.src = imageSrc;
    modal.style.display = "block";
  }

  // Close the modal
  const modal = document.getElementById("imageModal");
  const closeBtn = document.getElementsByClassName("close")[0];

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside the image
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Fetch images for the second carousel
  fetch("/api/carousel-images-2")
    .then((response) => response.json())
    .then((data) => {
      setupCarousel("carouselInner2", data);
    })
    .catch((error) => console.error("Error fetching carousel images:", error));
});
