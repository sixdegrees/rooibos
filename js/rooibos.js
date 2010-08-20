//= require "vendor/modernizr"
//= require "vendor/jquery"
//= require "vendor/jquery-ui"
//= require "vendor/metadata"
//= require "vendor/hashchange"
//= require "vendor/sammy"
//= require "vendor/mustache"
//= require "ui/outline"

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
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function( res, status ) {
				// If successful, inject the HTML into all the matched elements
				if ( status === "success" || status === "notmodified" ) {
					self.html(Mustache.to_html(res.responseText));
					self.find("button, input:submit, .button").each(function() { jQuery(this).button(jQuery(this).metadata()); });
          self.find(".buttonset").each(function() { jQuery(this).buttonset(jQuery(this).metadata()); });
          self.find(".dialog").hide().each(function() {
            var el = this;
            self.find("*[data-for=" + jQuery(this).attr("id") + "]").click(function(e) {
              e.preventDefault();
              jQuery(el).dialog(jQuery(this).metadata());
            });
          });
          self.find(".outline").outline();
				}

				if ( callback ) {
					self.each( callback, [res.responseText, status, res] );
				}
			}
		});

		return this;
	}
});