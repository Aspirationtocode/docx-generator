setTimeout(function() {
  $('.vkr-form').addClass('active');
}, 0)

$(function() {
  $('.vkr-form').submit(function(event) {
    const data = $(this).serializeArray();
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: '/generate',
      data
    });
  });
});
