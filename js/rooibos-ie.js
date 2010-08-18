//= require "vendor/flexify"

function reflow() {
  $(".vbox").flow("vertical");
  $(".hbox").flow("horizontal");
  $("#application").flex("height", 1);
  $(".vbox > .flex").flex("height", 1).children().flex("height", 1);
  $(document).flexify();
}