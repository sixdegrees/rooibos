(function($, undefined) {
  $.widget("ui.outline", $.ui.accordion, {
    _create: function() {
      this.options.autoHeight = false;
      $.ui.accordion.prototype._create.apply(this);
      this.element.addClass("ui-outline");
      // Highlight selected element on hash change
      var self = this;
      $(window).hashchange(function() {
        self.element.find(".ui-accordion-content a").removeClass("selected");
        var el = self.element.find(".ui-accordion-content a[href=" + location.hash + "]");
        el.addClass("selected");
        self.options.animated = false;
        self.activate(self.element.find(".ui-accordion-content").index(el.parent().parent().parent()));
        self.options.animated = "slide";
      }).hashchange();
      
      if (self.options.richHeaders) {
        self.element.find(".ui-accordion-header a").click(function() {
          window.location.hash = $(this).attr("href");
        });
      }
    }
  });
})(jQuery);