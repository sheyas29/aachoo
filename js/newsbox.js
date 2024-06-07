$(document).ready(function() {
  function fetchLinks() {
    $.getJSON('/api/links', function(data) {
      const linksList = $('#links-list');
      linksList.empty();
      $.each(data, function(index, link) {
        const listItem = $('<li></li>');
        const anchor = $('<a></a>').attr('href', link.url).attr('target', '_blank').text(link.name);
        listItem.append(anchor);
        linksList.append(listItem);
      });
      startScrolling();
    }).fail(function() {
      console.log('Error fetching links');
    });
  }

  function startScrolling() {
    const linksList = $('#links-list');
    const scrollingBox = $('#scrolling-box');
    let scrollHeight = linksList.height();
    let scrollPosition = scrollingBox.height();

    function scrollContent() {
      scrollPosition -= 1;
      if (scrollPosition <= -scrollHeight) {
        scrollPosition = scrollingBox.height();
      }
      linksList.css('transform', `translateY(${scrollPosition}px)`);
    }

    let scrollInterval = setInterval(scrollContent, 20);

    function stopScrolling() {
      clearInterval(scrollInterval);
    }

    function resumeScrolling() {
      scrollInterval = setInterval(scrollContent, 20);
    }

    scrollingBox.on('mouseenter', stopScrolling);
    scrollingBox.on('mouseleave', resumeScrolling);

    resumeScrolling(); // Start scrolling on page load
  }

  fetchLinks();
});
