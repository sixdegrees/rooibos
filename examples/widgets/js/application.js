var app = $.sammy(function() {
  this.element_selector = "#content";
  this.use(Sammy.Template);
  this.use(Sammy.Rooibos);
  
  this.get("#/", function() {
    this.partial("js/views/buttons/default.ms");
  });
  
  this.get("#/buttons/radios", function() {
    this.partial("js/views/buttons/radios.ms");
  });
  
  this.get("#/buttons/checkboxes", function() {
    this.partial("js/views/buttons/checkboxes.ms");
  });
  
  this.get("#/buttons/icons", function() {
    this.partial("js/views/buttons/icons.ms");
  });
  
  this.get("#/buttons/back", function() {
    this.partial("js/views/buttons/back.ms");
  });
  
  this.get("#/buttons/buttonbar", function() {
    this.partial("js/views/buttons/buttonbar.ms");
  });
  
  this.get("#/widgets/form-controls", function() {
    this.partial("js/views/widgets/form_controls.ms");
  });
  
  this.get("#/widgets/dialogs", function() {
    this.partial("js/views/widgets/dialogs.ms");
  });
  
  this.get("#/widgets/progress", function() {
    this.partial("js/views/widgets/progress.ms");
  });
  
  this.get("#/widgets/loading", function() {
    this.partial("js/views/widgets/loading.ms");
  });
  
  this.get("#/widgets/scrollbars", function() {
    this.partial("js/views/widgets/scrollbars.ms");
  });
  
  this.get("#/widgets/accordion", function() {
    this.partial("js/views/widgets/accordion.ms");
  });
  
  this.get("#/widgets/table", function() {
    this.partial("js/views/widgets/table.ms");
  });
});

$(function() { app.run("#/"); });