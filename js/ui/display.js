var Rooibos = {
  update: function(selector) {
    var element = $(selector);
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
  }
};

jQuery.metadata.setType("attr", "data");