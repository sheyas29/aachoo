$(document).ready(function() {
  let currentNewsType = 'cas';

  function fetchLinks(newsType) {
    const endpoint = newsType === 'cas' ? '/api/cas-news' : '/api/drdo-news';
    $.getJSON(endpoint, function(data) {
      console.log('Fetched data:', data); // Log fetched data
      const linksList = $('#links-list');
      linksList.empty();
      $.each(data, function(index, item) {
        const listItem = $('<p></p>');
        if (item.url) {
          const anchor = $('<a></a>').attr('href', item.url).attr('target', '_blank').text(item.name);
          listItem.append(anchor);
        } else {
          listItem.text(item.name);
        }
        console.log('Appending item:', listItem.html()); // Log the list item content
        linksList.append(listItem);
      });
      startScrolling();
    }).fail(function() {
      console.log('Error fetching links');
    });
  }

  function startScrolling() {
    const scrollContent = $('#links-list');

    function stopScrolling() {
      scrollContent.css('animation-play-state', 'paused');
    }

    function resumeScrolling() {
      scrollContent.css('animation-play-state', 'running');
    }

    $('#scrolling-box').on('mouseenter', stopScrolling);
    $('#scrolling-box').on('mouseleave', resumeScrolling);

    resumeScrolling(); // Start scrolling on page load
  }

  $('#cas-news-btn').click(function() {
    if (currentNewsType !== 'cas') {
      currentNewsType = 'cas';
      $('#cas-news-btn').addClass('btn-primary').removeClass('btn-secondary');
      $('#drdo-news-btn').addClass('btn-secondary').removeClass('btn-primary');
      fetchLinks('cas');
    }
  });

  $('#drdo-news-btn').click(function() {
    if (currentNewsType !== 'drdo') {
      currentNewsType = 'drdo';
      $('#drdo-news-btn').addClass('btn-primary').removeClass('btn-secondary');
      $('#cas-news-btn').addClass('btn-secondary').removeClass('btn-primary');
      fetchLinks('drdo');
    }
  });

  // Initial fetch for CAS News
  fetchLinks('cas');
});
