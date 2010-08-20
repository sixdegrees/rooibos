app = $.sammy () ->
  this.get "#/", -> $("#content").display("js/views/buttons/default.ms")
  this.get "#/buttons/radios", -> $("#content").display("js/views/buttons/radios.ms")
  this.get "#/buttons/checkboxes", -> $("#content").display("js/views/buttons/checkboxes.ms")
  this.get "#/buttons/icons", -> $("#content").display("js/views/buttons/icons.ms")

$ () -> $("body").display "js/views/layout.ms", -> app.run("#/")