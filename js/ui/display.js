jQuery.fn.extend({
	display: function( url, params, callback ) {
		if ( typeof url !== "string" ) {
			return _load.call( this, url );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			complete: function( res, status ) {
				// If successful, inject the HTML into all the matched elements
				if ( status === "success" || status === "notmodified" ) {
					self.html(Mustache.to_html(res.responseText, params));
					/* UI buttons */
					self.find("button, input:submit, .button").each(function() { jQuery(this).button(jQuery(this).metadata()); });
          /* UI buttonsets */
          self.find(".buttonset").each(function() { jQuery(this).buttonset(jQuery(this).metadata()); });
          /* UI dialogs */
          self.find(".dialog").hide().each(function() {
            var el = this;
            self.find("*[data-for=" + jQuery(this).attr("id") + "]").click(function(e) {
              e.preventDefault();
              jQuery(el).dialog(jQuery(this).metadata());
            });
          });
          /* UI outlines */
          self.find(".outline").each(function() { jQuery(this).outline(jQuery(this).metadata()); });
          /* UI selectmenus */
          self.find("select").each(function() { jQuery(this).selectmenu(jQuery(this).metadata()); });
          /* Uniform controls */
          if (!jQuery.browser.webkit) $("input:checkbox:not(.ui-helper-hidden-accessible), input:radio:not(.ui-helper-hidden-accessible)").uniform();
          /* UI progress bars */
          self.find(".progressbar").each(function() { jQuery(this).progressbar(jQuery(this).metadata()); });
          /* UI Accorions */
          self.find(".accordion").each(function() { jQuery(this).accordion(jQuery(this).metadata()); });
          /* Flexible box model compatibility */
          if (!jQuery.browser.webkit && !jQuery.browser.mozilla) {
            self.find(".vbox").flow("vertical");
            self.find(".hbox").flow("horizontal");
            self.find(".vbox > .flex").flex("height", 1).children().flex("height", 1);
            self.find(".hbox > .flex").flex("width", 1).children().flex("width", 1);
            jQuery(document).flexify();
          } 
				}

				if ( callback ) {
					self.each( callback, [res.responseText, status, res] );
				}
			}
		});

		return this;
	}
});

jQuery.metadata.setType("attr", "data");