(function($, undefined) {
  $.widget("ui.outline", $.ui.accordion, {
    _create: function() {
      this.options.autoHeight = false;
      this.options.collapsible = true;
      this.options.active = false;
      this.eventOption = this.options.event;
      this.options.event = false;
      $.ui.accordion.prototype._create.apply(this);
      this.element.addClass("ui-outline");
      // Highlight selected element on hash change
      var self = this;

      $(window).hashchange(function() {
        self.element.find("a.selected").each(function(k, v) {
          var regex = $(v).attr('href');

          if (window.location.hash.match(regex) == null) {
            $(v).removeClass("selected");
          }
        });

        self.element.find(".ui-accordion-header.selected").each(function(k, v) {
          var regex = $(v).find('a').attr('href');

          if (window.location.hash.match(regex) == null) {
            $(v).removeClass("selected");
          }
        });

        var el = self.element.find("a[href=" + location.hash + "]")
        if (el.parent().hasClass("ui-accordion-header")) el.parent().addClass("selected");
        else el.addClass("selected");
      }).hashchange();
    },

    _createIcons: function() {
      $.ui.accordion.prototype._createIcons.apply(this);

      // TODO : find a way to avoid making and then removing the arrows
      $('.ui-accordion-header', this.context).each(function() {
        if ($(this).next().html() == "") {
          $('.ui-icon', this).remove()
          $('a', this).addClass('ui-noicon')
        }
      });

      var self = this;
      if (this.eventOption) {
        self.headers.find("span.ui-icon").bind( this.eventOption.split(" ").join(".accordion ") + ".accordion", function(event) {
          event.currentTarget = $(this).parent()[0];
          self._clickHandler.call( self, event, $(this).parent()[0] );
          event.preventDefault();
        });
      }
    }
  });
})(jQuery);
