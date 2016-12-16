$(function() {
  $('.vkr-form').submit(function(event) {
    event.preventDefault(); // Stops browser from navigating away from page
    $.ajax({
      type: "POST",
      url: '/generate'
    });
  });
});
