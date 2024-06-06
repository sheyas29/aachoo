document.addEventListener('DOMContentLoaded', function() {
  // Initialize the Bootstrap carousels
  $('#carouselExampleControls1').carousel({
    interval: 3000 // Change slide every 3 seconds
  });

  $('#carouselExampleControls2').carousel({
    interval: 3000 // Change slide every 3 seconds
  });

  // Add functionality to the "Flash NEWS" marquee (optional)
  let flashNewsMarquee = document.querySelector('marquee');
  if (flashNewsMarquee) {
    flashNewsMarquee.addEventListener('mouseover', function() {
      this.stop();
    });
    flashNewsMarquee.addEventListener('mouseout', function() {
      this.start();
    });
  }

  // Fetch carousel images and populate carousels
  fetch('/api/carousel-images')
    .then(response => response.json())
    .then(data => {
      const carouselInner1 = document.getElementById('carouselInner1');
      const carouselInner2 = document.getElementById('carouselInner2');

      data.forEach((image, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const carouselItem1 = `
          <div class="carousel-item ${activeClass}">
            <div class="card" style="width: 100%;">
              <img src="${image.image_path}" class="card-img-top" alt="${image.caption}">
              <div class="card-body">
                <h5 class="card-title">${image.caption}</h5>
                <p class="card-text">Description for ${image.caption}.</p>
              </div>
            </div>
          </div>`;
        const carouselItem2 = `
          <div class="carousel-item ${activeClass}">
            <div class="card" style="width: 100%;">
              <img src="${image.image_path}" class="card-img-top" alt="${image.caption}">
              <div class="card-body">
                <h5 class="card-title">${image.caption}</h5>
                <p class="card-text">Description for ${image.caption}.</p>
              </div>
            </div>
          </div>`;
        
        carouselInner1.innerHTML += carouselItem1;
        carouselInner2.innerHTML += carouselItem2;
      });
    })
    .catch(error => console.error('Error fetching carousel images:', error));

  // Continuous vertical scroll for newsbox
  const scrollingBox = document.getElementById('scrolling-box');
  const linksList = document.getElementById('links-list');

  scrollingBox.addEventListener('mouseover', () => {
    linksList.style.animationPlayState = 'paused';
  });

  scrollingBox.addEventListener('mouseout', () => {
    linksList.style.animationPlayState = 'running';
  });
});
