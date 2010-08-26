(function($, undefined) {
  $.widget("ui.outline", $.ui.accordion, {
    _create: function() {
      this.options.autoHeight = false;
      this.options.collapsible = true;
      this.eventOption = this.options.event;
      this.options.event = false;
      $.ui.accordion.prototype._create.apply(this);
      this.element.addClass("ui-outline");
      // Highlight selected element on hash change
      var self = this;
      $(window).hashchange(function() {
        self.element.find(".ui-accordion-content a").removeClass("selected");
        var el = self.element.find(".ui-accordion-content a[href=" + location.hash + "]");
        el.addClass("selected");
        // FIXME: Doesn't work with collapsible
        // self.options.animated = false;
        // self.activate(self.element.find(".ui-accordion-content").index(el.parent().parent().parent()));
        // self.options.animated = "slide";
      }).hashchange();
    },
    
    _createIcons: function() {
      $.ui.accordion.prototype._createIcons.apply(this);
      
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