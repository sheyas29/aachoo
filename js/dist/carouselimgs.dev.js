"use strict";

document.addEventListener("DOMContentLoaded", function () {
  function setupCarousel(carouselInnerId, images) {
    var carouselInner = document.getElementById(carouselInnerId);
    images.forEach(function (image, index) {
      var activeClass = index === 0 ? "active" : "";
      var carouselItem = "\n        <div class=\"carousel-item ".concat(activeClass, "\">\n          <img src=\"").concat(image.image_path, "\" class=\"d-block w-100 carousel-image border-image\" alt=\"").concat(image.caption, "\">\n        </div>");
      carouselInner.innerHTML += carouselItem;
    }); // Add event listeners to images

    var carouselImages = document.querySelectorAll("#".concat(carouselInnerId, " .carousel-image"));
    carouselImages.forEach(function (img) {
      img.addEventListener("click", function () {
        showModal(this.src);
      });
    });
  }

  function showModal(imageSrc) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    modalImg.src = imageSrc;
    modal.style.display = "block";
  } // Close the modal


  var modal = document.getElementById("imageModal");
  var closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  }); // Close the modal when clicking outside the image

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }); // Fetch images for the second carousel

  fetch("/api/carousel-images-2").then(function (response) {
    return response.json();
  }).then(function (data) {
    setupCarousel("carouselInner2", data);
  })["catch"](function (error) {
    return console.error("Error fetching carousel images:", error);
  });
});