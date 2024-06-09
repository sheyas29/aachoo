$(document).ready(function() {
    function fetchContent(endpoint, elementId) {
      $.getJSON(endpoint, function(data) {
        console.log('Fetched data for ' + elementId, data); // Log fetched data
        const contentElement = $('#' + elementId);
        contentElement.empty();
        contentElement.text(data.content); // Assuming the response has a 'content' field
      }).fail(function() {
        console.log('Error fetching content for ' + elementId);
      });
    }
  
    function loadAccordionContent() {
      fetchContent('/api/quote', 'quote-content');
      fetchContent('/api/security-tip', 'security-tip-content');
      fetchContent('/api/daily-hindi-word', 'daily-hindi-word-content');
    }
  
    // Load content on page load
    loadAccordionContent();
  });
  