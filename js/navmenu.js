$(document).ready(function() {
  $('body').addClass('js');
  var $menu = $('#menu'),
    $menulink = $('.menu-link');
    $h1 = $('h1');
    $form = $('form');

$menulink.click(function() {
  $menulink.toggleClass('active');
  $menu.toggleClass('active');
  $h1.toggle();
  $form.toggle();

  return false;
});});
