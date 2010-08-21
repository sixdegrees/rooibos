app = $.sammy () ->
  this.get "#/", -> $("#content").display("js/views/buttons/default.ms")
  this.get "#/buttons/radios", -> $("#content").display("js/views/buttons/radios.ms")
  this.get "#/buttons/checkboxes", -> $("#content").display("js/views/buttons/checkboxes.ms")
  this.get "#/buttons/icons", -> $("#content").display("js/views/buttons/icons.ms")
  this.get "#/buttons/back", -> $("#content").display("js/views/buttons/back.ms")
  this.get "#/widgets/form-controls", -> $("#content").display("js/views/widgets/form_controls.ms")
  this.get "#/widgets/dialogs", -> $("#content").display("js/views/widgets/dialogs.ms")
  this.get "#/widgets/progress", -> $("#content").display("js/views/widgets/progress.ms")

$ () -> $("body").display "js/views/layout.ms", -> app.run("#/")