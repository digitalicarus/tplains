/*global define,console*/
//TODO: write dot template plugin
define([
	'dot',
	'jquery'
], function (dot, $) {
	"use strict";

	var ret = {}
	,   $main = $('main')
	,   $header = $('header')
	,   $footer = $('footer')
	,   $primaryContainer = $('.container.primary')
	,   $contentContainer = $('main').find('.container')
	,   $gameframe = $('iframe.game')
	;

	ret.dot = dot;

	ret.swapVis  = function ($replaceWhat, $replaceWith) {
		$($replaceWhat).hide();
		$($replaceWith).show();
	};

	ret.resize = function () {
		var priHeight = parseInt($primaryContainer.height(), 10)
		,   headerHeight = parseInt($header.height(), 10)
		,   footerHeight = parseInt($footer.height(), 10)
		,   mainHeight = priHeight - headerHeight - footerHeight
		,   sectionMargin = parseInt($('main section').css('margin-bottom'), 10)
		,   sectionScale = mainHeight / (parseInt($('main section').outerHeight(), 10) + sectionMargin)
		;

		console.log(sectionScale);

		$main.outerHeight(priHeight - headerHeight - footerHeight);

		$('.slideContainer').css({
			'-webkit-transform': 'scale(' + sectionScale + ')',
			'-ms-transform': 'scale(' + sectionScale + ')',
			'-moz-transform': 'scale(' + sectionScale + ')'
		});

		ret.scale = sectionScale;

	};

	ret.minimize = function () {
		$primaryContainer.addClass('minimized');
	};

	ret.maximize = function () {
		// kill game
        $gameframe[0].src = 'about:blank';
		$primaryContainer.removeClass('minimized');
		setTimeout(function () {
			$(window).trigger('resize');
		}, 500);
	};

	ret.loadFrameSrc = function (frameSrc) {
		$gameframe[0].src = frameSrc;
		ret.minimize();
	};

	ret.applyFrameTriggers = function () {
		$('*[data-framesrc]').on('click', function (e) {
			console.log('attaching events to ', this);
			ret.loadFrameSrc($(this).attr('data-framesrc'));
		});
	};


	window.loadFrameSrc = ret.loadFrameSrc;

	return ret;
});
