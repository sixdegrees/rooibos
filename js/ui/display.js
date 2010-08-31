Sammy.Rooibos = function(app, method_alias) {
  
  this.bind("changed", function(e, data) {
		element = data ? data["element"] : $("body");
		/* UI buttons */
		element.find("button, input:submit, .button").each(function() { jQuery(this).button(jQuery(this).metadata()); });
    /* UI buttonsets */
    element.find(".buttonset").each(function() { jQuery(this).buttonset(jQuery(this).metadata()); });
    /* UI dialogs */
    element.find(".dialog").each(function() { jQuery(this).dialog(jQuery(this).metadata()); });
    /* UI outlines */
    element.find(".outline").each(function() { jQuery(this).outline(jQuery(this).metadata()); });
    /* UI Menu */
    element.find(".menu").each(function() { jQuery(this).menu(jQuery(this).metadata()); });
    /* UI selectmenus */
    element.find("select").each(function() { jQuery(this).selectmenu(jQuery(this).metadata()); });
    /* Uniform controls */
    if (!jQuery.browser.webkit) element.find("input:checkbox:not(.ui-helper-hidden-accessible), input:radio:not(.ui-helper-hidden-accessible)").uniform();
    /* UI progress bars */
    element.find(".progressbar").each(function() { jQuery(this).progressbar(jQuery(this).metadata()); });
    /* UI Accorions */
    element.find(".accordion").each(function() { jQuery(this).accordion(jQuery(this).metadata()); });
    /* Flexible box model compatibility */
    if (!jQuery.browser.webkit && !jQuery.browser.mozilla) {
      element.find(".vbox").flow("vertical");
      element.find(".hbox").flow("horizontal");
      element.find(".vbox > .flex").flex("height", 1).children().flex("height", 1);
      element.find(".hbox > .flex").flex("width", 1).children().flex("width", 1);
      element.flexify();
    }
	});
  
};

jQuery.extend(Sammy.RenderContext.prototype, {
  // executes `EventContext#swap()` with the `content`
  swap: function() {
    return this.then(function(content) {
      this.event_context.swap(content);
      this.event_context.trigger("changed", { element: this.event_context.$element() });
    });
  },
  
  // Same usage as `jQuery.fn.appendTo()` but uses `then()` to ensure order
  appendTo: function(selector) {
    return this.then(function(content) {
      $(selector).append(content);
      this.event_context.trigger("changed", { element: $(selector) });
    });
  },

  // Same usage as `jQuery.fn.prependTo()` but uses `then()` to ensure order
  prependTo: function(selector) {
    return this.then(function(content) {
      $(selector).prepend(content);
      this.event_context.trigger("changed", { element: $(selector) });
    });
  },

  // Replaces the `$(selector)` using `html()` with the previously loaded
  // `content`
  replace: function(selector) {
    return this.then(function(content) {
      $(selector).html(content);
      this.event_context.trigger("changed", { element: $(selector) });
    });
  }
});

jQuery.metadata.setType("attr", "data");