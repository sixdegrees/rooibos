(function($, undefined) {
  $.widget("ui.outline", $.ui.accordion, {
    _create: function() {
      this.options.autoHeight = false;
      $.ui.accordion.prototype._create.apply(this);
      this.element.addClass("ui-outline");
      var links = this.element.find(".ui-accordion-content a");
      links.click(function() {
        links.removeClass("selected");
        $(this).addClass("selected");
      });
    }
  });
})(jQuery);