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
  this.get("#/buttons/icons", function() {
    return $("#content").display("js/views/buttons/icons.ms");
  });
  this.get("#/buttons/back", function() {
    return $("#content").display("js/views/buttons/back.ms");
  });
  this.get("#/widgets/form-controls", function() {
    return $("#content").display("js/views/widgets/form_controls.ms");
  });
  this.get("#/widgets/dialogs", function() {
    return $("#content").display("js/views/widgets/dialogs.ms");
  });
  this.get("#/widgets/progress", function() {
    return $("#content").display("js/views/widgets/progress.ms");
  });
});
$(function() {
  return $("body").display("js/views/layout.ms", function() {
    return app.run("#/");
  });
});