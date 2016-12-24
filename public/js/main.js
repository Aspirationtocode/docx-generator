

setTimeout(function() {
  $('.vkr-form').addClass('active');
  $('.vkr-list-wrapper').addClass('active');
}, 0)

$('.vkr-form').bind('submit', function(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  var data = $(this).serializeArray();
  var list = $('.vkr-list');
  var listItem = $(`<li class="vkr-list-item" data-index=${$('.vkr-list-item').length}>
    <div class="vkr-list-item__main-info">${data[0].value} ${data[1].value.slice(0, 1)}. ${data[2].value.slice(0, 1)}. ${data[10].value}<div class="vkr-list-item__repeat"></div></div>
    <div class="vkr-list-item__extra-info">
      <div class="vkr-list-item__group vkr-list-item__extra-info-item">Группа:<span class="vkr-list-item__descr">${data[3].value}</span></div>
      <div class="vkr-list-item__student_code vkr-list-item__extra-info-item">Шифр:<span class="vkr-list-item__descr">${data[4].value}</span></div>
      <div class="vkr-list-item__professor_name vkr-list-item__extra-info-item">Преподаватель:<span class="vkr-list-item__descr">${data[5].value} ${data[6].value.slice(0, 1)}. ${data[7].value.slice(0, 1)}.</span></div>
      <div class="vkr-list-item__year vkr-list-item__extra-info-item">Год:<span class="vkr-list-item__descr">${data[8].value}</span></div>
      <div class="vkr-list-item__subject vkr-list-item__extra-info-item">Предмет:<span class="vkr-list-item__descr">${data[9].value}</span></div>
    </div>
  </li>`);
  list.append(listItem);
  $.post('/generate', data);
});

$('.vkr-list').on('click', '.vkr-list-item', function(e) {
  if (!e.target.classList.contains('vkr-list-item__repeat')) {
    $('.vkr-list-item__extra-info').hide(300);
    var $listItem = $(this).find('.vkr-list-item__extra-info');
    if (!$listItem.is(':visible')) {
        $listItem.show(300);
    }
  }
})
$('.vkr-list').on('click', '.vkr-list-item__repeat', function(e) {
  var listItemIndex = $(e.target).closest('.vkr-list-item').data('index');
  $.getJSON( "data.json", function( data ) {
    var item = data[listItemIndex];
    for (var key in item) {
      $(`input[name="${key}"]`).val(item[key]);
    }
  });
})

function testObject(obj, regExp) {
  var ok = false;
  for (var key in obj) {
    if (regExp.test(obj[key])) {
      ok = true;
    }
  }
  return ok;
}

$('.vkr-list__search').on('keyup', function() {
  var listItems = $('.vkr-list-item');
  var string = $(this).val().trim();
  var regExp = new RegExp(string, 'i');
  $.getJSON( "data.json", function( data ) {
    data.forEach(function(item, i, arr) {
      if (testObject(item, regExp)) {
        listItems.eq(i).show(200);
      } else {
        listItems.eq(i).hide(200);
      }
    })
  });
})
