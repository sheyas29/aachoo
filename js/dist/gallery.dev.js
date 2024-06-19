"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Fetch images for the carousel
  fetch("/api/carousel-images-gallery").then(function (response) {
    return response.json();
  }).then(function (data) {
    var carouselInner = document.getElementById("carouselInner");
    carouselInner.innerHTML = "";
    data.forEach(function (image, index) {
      var activeClass = index === 0 ? "active" : "";
      var carouselItem = "\n            <div class=\"carousel-item ".concat(activeClass, "\">\n              <img src=\"").concat(image.image_path, "\" class=\"d-block w-100\" alt=\"").concat(image.caption, "\">\n            </div>");
      carouselInner.innerHTML += carouselItem;
    });
  })["catch"](function (error) {
    return console.error("Error fetching carousel images:", error);
  });
});