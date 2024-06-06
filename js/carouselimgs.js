document.addEventListener('DOMContentLoaded', function() {
  // Fetch images for the first carousel
  fetch('/api/carousel-images')
    .then(response => response.json())
    .then(data => {
      const carouselInner1 = document.getElementById('carouselInner1');
      
      data.forEach((image, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const carouselItem = `
          <div class="carousel-item ${activeClass}">
            <div class="card" style="width: 100%;">
              <img src="${image.image_path}" class="card-img-top" alt="${image.caption}">
              <div class="card-body">
                <h5 class="card-title">${image.caption}</h5>
                <p class="card-text">Description for ${image.caption}.</p>
              </div>
            </div>
          </div>`;
        
        carouselInner1.innerHTML += carouselItem;
      });
    })
    .catch(error => console.error('Error fetching carousel images:', error));

  // Fetch images for the second carousel
  fetch('/api/carousel-images-2')
    .then(response => response.json())
    .then(data => {
      const carouselInner2 = document.getElementById('carouselInner2');
      
      data.forEach((image, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const carouselItem = `
          <div class="carousel-item ${activeClass}">
            <div class="card" style="width: 100%;">
              <img src="${image.image_path}" class="card-img-top" alt="${image.caption}">
              <div class="card-body">
                <h5 class="card-title">${image.caption}</h5>
                <p class="card-text">Description for ${image.caption}.</p>
              </div>
            </div>
          </div>`;
        
        carouselInner2.innerHTML += carouselItem;
      });
    })
    .catch(error => console.error('Error fetching carousel images:', error));
});
