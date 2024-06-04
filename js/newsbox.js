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
    const linksList = document.getElementById('links-list');
    let scrollPosition = 0;
    let scrollInterval;

    function scrollContent() {
      scrollPosition++;
      linksList.style.transform = `translateY(-${scrollPosition}px)`;
      if (scrollPosition >= linksList.scrollHeight) {
        scrollPosition = 0;
      }
    }

    function stopScrolling() {
      clearInterval(scrollInterval);
    }

    function resumeScrolling() {
      scrollInterval = setInterval(scrollContent, 30);
    }

    scrollInterval = setInterval(scrollContent, 30); // Adjust this value to control speed

    linksList.addEventListener('mouseenter', stopScrolling);
    linksList.addEventListener('mouseleave', resumeScrolling);
  }

  fetchLinks();
});
