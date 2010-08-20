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
        self.activate(self.element.find(".ui-accordion-content").index(el.parent().parent().parent()));
      }).hashchange();
    }
  });
})(jQuery);