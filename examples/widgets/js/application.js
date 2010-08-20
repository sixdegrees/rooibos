var app;
app = $.sammy(function() {
  this.get("#/", function() {
    return $("#content").display("js/views/buttons/default.ms");
  });
  this.get("#/buttons/radios", function() {
    return $("#content").display("js/views/buttons/radios.ms");
  });
  this.get("#/buttons/checkboxes", function() {
    return $("#content").display("js/views/buttons/checkboxes.ms");
  });
  return this.get("#/buttons/icons", function() {
    return $("#content").display("js/views/buttons/icons.ms");
  });
});
$(function() {
  return $("body").display("js/views/layout.ms", function() {
    return app.run("#/");
  });
});