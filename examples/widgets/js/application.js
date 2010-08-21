var app = $.sammy(function() {
  this.get("#/", function() {
    $("#content").display("js/views/buttons/default.ms");
  });
  
  this.get("#/buttons/radios", function() {
    $("#content").display("js/views/buttons/radios.ms");
  });
  
  this.get("#/buttons/checkboxes", function() {
    $("#content").display("js/views/buttons/checkboxes.ms");
  });
  
  this.get("#/buttons/icons", function() {
    $("#content").display("js/views/buttons/icons.ms");
  });
  
  this.get("#/buttons/back", function() {
    $("#content").display("js/views/buttons/back.ms");
  });
  
  this.get("#/widgets/form-controls", function() {
    $("#content").display("js/views/widgets/form_controls.ms");
  });
  
  this.get("#/widgets/dialogs", function() {
    $("#content").display("js/views/widgets/dialogs.ms");
  });
  
  this.get("#/widgets/progress", function() {
    $("#content").display("js/views/widgets/progress.ms");
  });
  
  this.get("#/widgets/loading", function() {
    $("#content").display("js/views/widgets/loading.ms");
  });
});

$(function() {
  $("body").display("js/views/layout.ms", function() { app.run("#/"); });
});