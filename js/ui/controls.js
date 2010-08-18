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
    outline: function(sections, opts) {
      var _a, _b, _c, _d, _e, _f, _g, _h, header, item, items, section;
      sections = (function() {
        _a = []; _c = sections;
        for (_b = 0, _d = _c.length; _b < _d; _b++) {
          section = _c[_b];
          _a.push((function() {
            header = ("<h3><a href='#'>" + (section.name) + "</a></h3>");
            items = (function() {
              _e = []; _g = section.items;
              for (_f = 0, _h = _g.length; _f < _h; _f++) {
                item = _g[_f];
                _e.push(("<li><a href='" + (item.href) + "'>" + (item.name) + "</a></li>"));
              }
              return _e;
            })();
            return "" + (header) + "<div><ul>" + (items.toString()) + "</ul></div>";
          })());
        }
        return _a;
      })();
      return $("<div class='outline'></div>").append(sections.toString()).outline(opts);
    }
  }
});