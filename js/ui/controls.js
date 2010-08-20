var __slice = Array.prototype.slice;
$.extend({
  create: function(name) {
    var args;
    args = __slice.call(arguments, 1);
    return this.controls[name].apply(this.controls, args);
  },
  controls: {
    toolbar: function() {
      return $("<div class='toolbar'></div>");
    },
    navbar: function() {
      return $("<div class='navbar'></div>");
    },
    vbox: function() {
      return $("<div class='vbox'></div>");
    },
    hbox: function() {
      return $("<div class='hbox'></div>");
    },
    flexspace: function() {
      return $("<div class='flexspace'></div>");
    },
    outline: function(data, opts) {
      var html;
      html = Mustache.to_html(" \
{{#sections}} \
<h3><a href='#'>{{name}}</a></h3> \
<div> \
<ul> \
{{#items}} \
<li><a href='{{href}}'>{{name}}</a></li> \
{{/items}} \
</ul> \
</div> \
{{/sections}}", data);
      return $("<div class='outline'></div>").append(html).outline(opts);
    }
  }
});