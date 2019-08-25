$("a[href*='#']").on('click', function(e) {
  e.preventDefault();
  var href = $(this).attr('href');
  //req = href.substring(href.indexOf('#'));
  $('html, body').animate(
    {
      scrollTop: $(href).offset().top,
    },
    500);
});