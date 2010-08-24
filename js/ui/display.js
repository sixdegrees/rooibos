Sammy.Rooibos = function(app, prefix, suffix) {
  
  this.bind("changed", function(e, data) {
		selector = $("body");
		/* UI buttons */
		selector.find("button, input:submit, .button").each(function() { jQuery(this).button(jQuery(this).metadata()); });
    /* UI buttonsets */
    selector.find(".buttonset").each(function() { jQuery(this).buttonset(jQuery(this).metadata()); });
    /* UI dialogs */
    selector.find(".dialog").hide().each(function() {
      var el = this;
      selector.find("*[data-for=" + jQuery(this).attr("id") + "]").click(function(e) {
        e.preventDefault();
        jQuery(el).dialog(jQuery(this).metadata());
      });
    });
    /* UI outlines */
    selector.find(".outline").each(function() { jQuery(this).outline(jQuery(this).metadata()); });
    /* UI selectmenus */
    selector.find("select").each(function() { jQuery(this).selectmenu(jQuery(this).metadata()); });
    /* Uniform controls */
    if (!jQuery.browser.webkit) $("input:checkbox:not(.ui-helper-hidden-accessible), input:radio:not(.ui-helper-hidden-accessible)").uniform();
    /* UI progress bars */
    selector.find(".progressbar").each(function() { jQuery(this).progressbar(jQuery(this).metadata()); });
    /* UI Accorions */
    selector.find(".accordion").each(function() { jQuery(this).accordion(jQuery(this).metadata()); });
    /* Flexible box model compatibility */
    if (!jQuery.browser.webkit && !jQuery.browser.mozilla) {
      self.find(".vbox").flow("vertical");
      self.find(".hbox").flow("horizontal");
      self.find(".vbox > .flex").flex("height", 1).children().flex("height", 1);
      self.find(".hbox > .flex").flex("width", 1).children().flex("width", 1);
      jQuery(document).flexify();
    }
	});
  
};

jQuery.metadata.setType("attr", "data");