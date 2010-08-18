/**
 * Flexify 1.1 | jQuery Plugin
 *
 * Copyright (c) 2008 Tim Cameron Ryan
 * http://plugins.jquery.com/project/Flexify
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
	/*
	 * Flexification
	 */

	$.fn.flexify = function ()
	{
		var elements = this.add(this.find('*')), flexDimensions = {}, flexPositioned = {};
		$.each(['horizontal', 'vertical'], function (i, axis) {
			flexDimensions[axis] = elements.filter(function () {
				return $(this).data('flexify-parent') && $(this).data('flexify-parent').axes[axis];
			});
			flexPositioned[axis] = elements.filter(function () {
				return $(this).data('flexify-position') && $(this).data('flexify-position').axes[axis];
			});
		});

		var closure = this;
		function flex()
		{
			flexDimensions.horizontal.flexifyDimensions('horizontal');
			flexPositioned.horizontal.flexifyPosition('horizontal');
			var width = closure.dimension('horizontal');
			flexDimensions.vertical.flexifyDimensions('vertical');
			flexPositioned.vertical.flexifyPosition('vertical');
			if (width < closure.dimension('horizontal'))
				return flex();

			$(window).one('reflow', flex);
		}
		flex();

		return this;
	}

	$.fn.flexifyDimensions = function (axis)
	{
		for (var i = this.length - 1, parent = this[i]; i > -1; parent = this[--i])
		{
			var data = $(parent).data('flexify-parent'), flexUnit = [0];
			data.children[axis].each(function resetChildFlexAndGetMinimums() {
				var childData = $(this).data('flexify-child');

				for (var property in childData.properties[axis])
					$(this).css(property, 0);

				if (childData.dimensions.hasOwnProperty(axis))
				{
					$(this).dimension(axis, 'content', childData.intrinsic[axis]);
					flexUnit.push((parseInt(childData.intrinsic[axis]) || $(this).dimension(axis, 'content')) / childData.dimensions[axis]);
				}
			});

			data.flexUnit = Math.max.apply(null, flexUnit);
			data.children[axis].each(function equalizeFlexChild() {
				var childData = $(this).data('flexify-child');
				for (var property in childData.properties[axis])
					$(this).css(property, data.flexUnit * childData.properties[axis][property])
				if (childData.dimensions.hasOwnProperty(axis))
					$(this).dimension(axis, 'content', data.flexUnit * childData.dimensions[axis]);
			});

			$(parent).trigger('FlexifyReset', [axis]);
		}

		for (var i = 0, parent = this[i]; i < this.length; parent = this[++i])
		{
			var data = $(parent).data('flexify-parent');
			var freeSpace = $(parent).dimension(axis, 'content'), usedSpace;
			if (axis == $(parent).flow())
				usedSpace = $(parent).contentDimension(axis, 'offset');

			data.children[axis].each(function applyFlexToChild(i, child) {
				if (axis != $(parent).flow())
					usedSpace = $(this).dimension(axis, 'border');

				var childData = $(this).data('flexify-child');
				var flexUnit = data.flexUnit + Math.max(Math.floor((freeSpace - usedSpace) / (axis == $(parent).flow() ? data.childDivisor[axis] : childData.divisor[axis])), 0);

				for (var property in childData.properties[axis])
					$(this).css(property, flexUnit * childData.properties[axis][property]);
				if (childData.dimensions.hasOwnProperty(axis))
					$(this).dimension(axis, 'content', flexUnit * childData.dimensions[axis]);
			});

			$(parent).trigger('FlexifyApply', [axis]);
		}

		return this;
	}

	$.fn.flexifyPosition = function (axis)
	{
		for (var i = 0, child = this[i], parent; i < this.length; child = this[++i])
		{
			if (!(parent = child.offsetParent))
				return;

			var data = $(child).data('flexify-position'), divisor = 0;
			for (var property in data.properties[axis])
				divisor += data.properties[axis][property];
			var flexUnit = Math.max(($(parent).dimension(axis, 'border') - $(child).dimension(axis, 'border')) / divisor, 0);
			for (var property in data.properties[axis])
				$(child).css(property, data.properties[axis][property] * flexUnit);
		}

		return this;
	}

	/*
	 * Flex property
	 */

	$.fn.flex = function (property, value)
	{
		property = property.replace(/^(border-[a-z]+)$/, '$1-width');
		var flexibleProps = {
			horizontal: 'margin-left|margin-right|border-left-width|border-right-width|padding-left|padding-right|width|left|right'.split('|'),
			vertical: 'margin-top|margin-bottom|border-top-width|border-bottom-width|padding-top|padding-bottom|height|top|bottom'.split('|')
		};
		var positionProps = 'left|right|top|bottom'.split('|');
		var dimensionProps = 'width|height'.split('|');

		for (var axis in flexibleProps)
			if ($.inArray(property, flexibleProps[axis]) != -1)
				break;
		if ($.inArray(property, flexibleProps[axis]) == -1)
			return false;

		if (arguments.length < 2)
			return $.inArray(property, dimensionProps) != -1 ?
			    $(this).data('flexify-child').dimensions[axis] :
			    $.inArray(property, positionProps) != -1 ?
			    $(this).data('flexify-position')[axis][property] :
			    $(this).data('flexify-child').properties[axis][property];

		if ($.inArray(property, positionProps) != -1)
		{
			return this.each(function (i, child) {
				if (!$(this).data('flexify-position'))
					$(this).data('flexify-position', {
					    properties: {horizontal: {}, vertical: {}},
					    axes: {horizontal: false, vertical: false}
					});
				$(this).data('flexify-position').axes[axis] = true;
				$(this).data('flexify-position').properties[axis][property] = value;
			});
		}

		var flexFilter = $.browser.msie ? 'html' :
		    $.browser.opera && $.browser.version < 9.5 ? 'html, body' : '';
		return this.not(flexFilter).each(function (i, child) {
			if (!$(this).parent().flow())
				$(this).parent().flow('vertical');

			if (!$(this).parent().data('flexify-parent'))
			    $(this).parent().data('flexify-parent', {
				flexUnit: 0,
				children: {horizontal: $([]), vertical: $([])},
				childDivisor: {horizontal: 0, vertical: 0},
				axes: {horizontal: false, vertical: false}
			    });
			if (!$(this).data('flexify-child'))
			    $(this).data('flexify-child', {
				divisor: {horizontal: 0, vertical: 0},
				intrinsic: {horizontal: null, vertical: null},
				properties: {horizontal: {}, vertical: {}},
				dimensions: {}
			    });

			$(this).data('flexify-child').divisor[axis] += value;
			$(this).parent().data('flexify-parent').childDivisor[axis] += value;
			$(this).parent().data('flexify-parent').axes[axis] = true;
			$(this).parent().data('flexify-parent').children[axis] = $(this).parent().data('flexify-parent').children[axis].add(this);

			if (property == 'width' || property == 'height')
			{
				$(this).data('flexify-child').dimensions[axis] = value;
				$(this).data('flexify-child').intrinsic[axis] = this.style[property];

				if ($.browser.opera && $.browser.version < 9.5 && $(this).is(':button, input, textarea, iframe'))
					$(this).data('flexify-child').intrinsic[axis] = $(this).dimension(axis);
			}
			else
				$(this).data('flexify-child').properties[axis][property] = value;

			var parentChain = $(this).add($(this).parents());
			$(this).parent().unbind('FlexifyReset.setMinimums')
			    .one('FlexifyReset.setMinimums', function (e, axis) {
				if (axis == 'horizontal')
					parentChain.trigger('ResetFlow');
			});
		});
	}


	function flexSelector(elem, i, selector) {
		return $(elem).data('flexify-child');
	}
	$.extend($.expr[':'], {flexible: flexSelector});

	/*
	 * Reflow event
	 */

	var wWidth, wHeight;
	function pollWindowResize() {
		var flag = wWidth != $(window).dimension('horizontal') || wHeight != $(window).dimension('vertical');
		wWidth = $(window).dimension('horizontal');
		wHeight = $(window).dimension('vertical');
		return flag;
	}
	$(function () {
		pollWindowResize();
		setInterval(function () {
			if (pollWindowResize())
				$(window).trigger('reflow');
		}, 250);
	});


	/*
	 * Flow property
	 */

	$.fn.flow = function flow(axis)
	{
		if (arguments.length < 1)
			return this.data('flow');

		return this.each(function (i, parent) {
			$(this).data('flow', axis == 'horizontal' ? 'horizontal' : 'vertical');

			for (var child = this.firstChild; child; child = child.nextSibling)
				if (child.nodeType == 3)
					/^\s+$/.test(child.nodeValue) ? this.removeChild(child)
					    : $(child).wrap('<div class="text"></div>');
			$(this).children().css('zoom', 1);

			if (axis == 'horizontal')
			{
				var shrinkWrap = $([]);
				$(this).children().each(function () {
					if (!$(this).is(':button') && $(this).dimensionIsAuto(axis))
						$(this).dimension(axis, 'content',
						    $(this).css('overflow') == 'auto' ? 0 :
						    $(this).contentDimension(axis, 'scroll'));
				});

				$(this).css($.browser.msie ? {'zoom': 1} : {'overflow': 'auto'});
				$(this).children().css({'float': 'left'});

				$(this).bind('ResetFlow', function () {
					$.swap(this, {width: '10000px'}, function () {
						$(this).dimension(axis, 'min', $(this).contentDimension(axis, 'offset') + 1);
					});
				}).trigger('ResetFlow');
			}
		});
	}


	function flowSelector(elem, i, selector) {
		return $(elem).data('flow') == selector[2];
	}
	$.extend($.expr[':'], {vertical: flowSelector, horizontal: flowSelector});

	/*
	 * Dimensions
	 */

	(function ()
	{
		function num(elem, attr)
		{
			return parseFloat($.curCSS( elem, attr, true)) || 0;
		}

		var Prop = {horizontal: 'Width', vertical: 'Height'},
		    tl = {horizontal: 'Left', vertical: 'Top'}, br = {horizontal: 'Right', vertical: 'Bottom'};

		/*
		 * Dimensions
		 */

		$.fn.dimension = function (axis, prefix, value)
		{
			if (!this.length)
				return null;
			var elem = this[0];
			prefix = prefix || 'content';

			if (elem == window || elem == document)
				return (document.compatMode == 'CSS1Compat' ? document.documentElement : document.body)['client' + Prop[axis]];
			if (value == undefined)
			{
				if (prefix == 'margin' || prefix == 'border')
					value = elem['offset' + Prop[axis]]
					    + (prefix == 'margin' ? num(elem, 'margin' + tl[axis]) + num(elem, 'margin' + br[axis]) : 0);
				if (prefix == 'padding' || prefix == 'content')
					value = elem['client' + Prop[axis]]
					    - (prefix == 'content' ? num(elem, 'padding' + tl[axis]) + num(elem, 'padding' + br[axis]) : 0);

				return Math.max(0, Math.ceil(value));
			}

			return this[prefix == 'content' ? Prop[axis].toLowerCase() : prefix + Prop[axis]](value);
		}

		if ($.browser.msie)
		{
			$(function () {
				var html = document.documentElement;
				$.each(['Left', 'Right', 'Top', 'Bottom'], function (i, prop) {
					if (html.currentStyle['border' + prop + 'Style'] != 'none' &&
					    html.currentStyle['border' + prop + 'Width'] == 'medium')
						html.style['border' + prop + 'Width'] = '2px';
				});
			});
		}

		/*
		 * Content dimensions
		 */

		$.fn.contentDimension = function (axis, means)
		{
			if (!this.length)
				return null;
			var elem = this[0];

			if ($.browser.msie && axis == 'vertical')
				return this[0].scrollHeight - (this[0] != document ?
				    num(this[0], 'padding' + tl[axis]) - num(this[0], 'padding' + br[axis]) : 0);

			if (means == 'scroll')
			{
				var css = {'float': 'left', 'border': '2px solid black'}, val;
				css[Prop[axis].toLowerCase()] = '1px';
				$.swap(elem, css, function () {
					val = elem['scroll' + Prop[axis]] - num(elem, 'padding' + tl[axis]) - num(elem, 'padding' + br[axis]);
				});
				return Math.max(0, Math.ceil(val));
			}

			for (var firstChild = elem.firstChild;
			    firstChild && firstChild.nodeType != 1;
			    firstChild = firstChild.nextSibling);
			if (!firstChild)
				return null;
			for (var lastChild = elem.lastChild;
			    lastChild && lastChild.nodeType != 1;
			    lastChild = lastChild.previousSibling);
			return Math.max(0, Math.ceil(
				num(firstChild, 'margin' + tl[axis])
				+ (lastChild['offset' + tl[axis]] - firstChild['offset' + tl[axis]]) + lastChild['offset' + Prop[axis]]
				+ num(lastChild, 'margin' + br[axis])
			    ));
		}

		/*
		 * Dimension analysis
		 */

		$.fn.dimensionIsAuto = function (axis)
		{
			if (!this.length)
				return;
			var oldPadding = this[0].style['padding' + tl[axis]];
			this[0].style['padding' + tl[axis]] = 0;
			var dimension = this[0]['offset' + Prop[axis]];
			this[0].style['padding' + tl[axis]] = '1px';
			var flag = this[0]['offset' + Prop[axis]] == dimension;
			this[0].style['padding' + tl[axis]] = oldPadding;
			return flag;
		}
	})();

	/*
	 * Min-width/height
	 */

	$.each({Height: 'height', Width: 'width'}, function (Prop, prop)
	{
		$.fn['min' + Prop] = function (value)
		{
			return this.css('min' + Prop, typeof value == 'string' ? value : value + 'px');
		}
	});

	if ($.browser.msie && $.browser.version < 7)
	{
		$.each({Height: 'height', Width: 'width'}, function (Prop, prop)
		{
			$.fn['min' + Prop] = function (value)
			{
				return this.each(function (i, child) {
					$(window).bind('reflow.minDimensions', function () {
						child.runtimeStyle[prop] = '';
					});
					$(this).css('zoom', 1).unbind('resize.minDimensions').bind('resize.minDimensions', function () {
						if ($(this)[prop]() < parseInt(value))
							this.runtimeStyle[prop] = typeof value == 'string' ? value : value + 'px';
					}).trigger('resize.minDimensions');
				});
			}

			$(window).one('resize.minDimensions', function checkBodyResize() {
				$('body').trigger('resize.minDimensions');
				$(window).one('resize.minDimensions', checkBodyResize);
			});
		});
	}
})(jQuery);

function reflow() {
  $(".vbox").flow("vertical");
  $(".hbox").flow("horizontal");
  $("#application").flex("height", 1);
  $(".vbox > .flex").flex("height", 1).children().flex("height", 1);
  $(document).flexify();
}
