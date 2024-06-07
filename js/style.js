document.addEventListener('DOMContentLoaded', function() {
  // Initialize the Bootstrap carousels
  $('#carouselExampleControls1').carousel({
    interval: 3000 // Change slide every 3 seconds
  });

  $('#carouselExampleControls2').carousel({
    interval: 3000 // Change slide every 3 seconds
  });

  // Add functionality to the "Flash NEWS" marquee
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
 
});