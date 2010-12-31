var Controller = Backbone.Controller.extend({
  routes: {
    "/": "index",
    "/:section/:name": "show"
  },
  
  index: function() {
    window.location = "#/buttons/default";
  },
  
  show: function(section, name) {
    this._update("#content", "js/views/" + section + "/" + name + ".html");
  },
  
  _update: function(selector, templatePath) {
    $(selector).load(templatePath, function() {
      Rooibos.update(selector);
    });
  }
});

$(function() {
  Rooibos.update("body");
  new Controller();
  Backbone.history.start();
  window.location = "#/";
});