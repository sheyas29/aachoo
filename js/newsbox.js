document.addEventListener("DOMContentLoaded", function() {
  function fetchLinks() {
    fetch('/api/links')
      .then(response => response.json())
      .then(data => {
        const linksList = document.getElementById('links-list');
        linksList.innerHTML = '';
        data.forEach(link => {
          const listItem = document.createElement('li');
          const anchor = document.createElement('a');
          anchor.href = link.url;
          anchor.target = '_blank';
          anchor.textContent = link.name;
          listItem.appendChild(anchor);
          linksList.appendChild(listItem);
        });
        startScrolling();
      })
      .catch(error => {
        console.log('Error fetching links:', error);
      });
  }

  function startScrolling() {
    const scrollingBox = document.getElementById('scrolling-box');
    const linksList = document.getElementById('links-list');
    let scrollPosition = 0;
    let scrollHeight = linksList.scrollHeight;
    let boxHeight = scrollingBox.clientHeight;
    let scrollInterval;

    function scrollContent() {
      scrollPosition++;
      if (scrollPosition >= scrollHeight) {
        scrollPosition = -boxHeight; // Reset position after all items have scrolled through
      }
      linksList.style.transform = `translateY(-${scrollPosition}px)`;
    }

    function stopScrolling() {
      clearInterval(scrollInterval);
    }

    function resumeScrolling() {
      scrollInterval = setInterval(scrollContent, 30);
    }

    scrollInterval = setInterval(scrollContent, 30); // Adjust this value to control speed

    scrollingBox.addEventListener('mouseenter', stopScrolling);
    scrollingBox.addEventListener('mouseleave', resumeScrolling);
  }

  fetchLinks();
});
