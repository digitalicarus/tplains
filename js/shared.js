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
	,   $sections = $('.slideContainer section')
	,   $gameframe = $('iframe.game')
	;

	ret.dot = dot;
	ret.slide = 1;

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
			'transform': 'scale(' + sectionScale + ')',
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

	ret.setSlide = function (slide, navigate) {
		if (!parseInt(slide, 10)) {
			console.log(slide + " is not a valid slide number");
			ret.slide = 1;
		} else {
			ret.slide = slide;
			if (ret.slide < 0) {
				ret.slide = 1;
			}
			if (ret.slide > $sections.length) {
				ret.slide = $sections.length;
			}
		}

		var $slide = $($sections[ret.slide-1]);


		//console.log('ret.slide: ' + ret.slide);
		if (navigate) {
			//console.log('navigate to: ' + $main.scrollTop() + $slide.offset().top + parseInt($slide.css('margin-top'), 10));
			$main.animate({
				'scrollTop':  $main.scrollTop() + $slide.offset().top - parseInt($slide.css('margin-top'), 10) * 1.5
			}, 160);
		}
	};

	ret.slideUp = function () {
		ret.setSlide(ret.slide-1, true);
	};

	ret.slideDown = function () {
		ret.setSlide(ret.slide+1, true);
	};

	ret.lockOn = function () {
		ret.setSlide(ret.slide, true);
	};

	ret.goTop = function () {
		ret.setSlide(1, true);
	};

	ret.goBottom = function () {
		ret.setSlide($sections.length, true);
	};

	$main.on('scroll', function () {
		$('.slideIndicator').html("Slide " + ret.slide + " of " + $sections.length);
	});

	window.loadFrameSrc = ret.loadFrameSrc;

	return ret;
});
