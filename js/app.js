/*global define:true,console:true*/
define([
	'jquery',
	'shared'
], function ($, Shared) {
	"use strict";

	var $main = $('main')
	,   $header = $('header')
	,   $container = $('.container')
	,   $sections  = $('.slideContainer > section')
	,   state = 'maximized'
	;


	$(window).on('resize', Shared.resize);

	$('button.bg-minimize').on('click', Shared.minimize);
	$('button.bg-maximize').on('click', Shared.maximize);
	setTimeout(function() {
		Shared.resize();
		Shared.setSlide(window.location.hash.replace(/#/,''), true);

//		$(window).on('hashchange', function (e) {
//		});
//		$(window).trigger('hashchange');
	}, 500);

  
	$('main').on('scroll', function (e) {
		var scrollTop = parseInt($(this).scrollTop(), 10)
		,   posDiff = null
		,   currPos = null
		;

		$sections.each(function (i, v) {
			currPos = parseInt($(v).position().top, 10);
			if (Math.abs(currPos) <= 250) {
				Shared.setSlide(i+1);
				return false; // reportedly breaks out of each
			}
		});
	});

	$(window).on('keydown', function (e) {
		var code = e.which || e.keyCode || e.key;

		// support vim gGj & k
		if (code === 40 || code === 74) { // down or 'j'
			Shared.slideDown();
		}
		if (code === 38 || code === 75) { // up or 'k'
			Shared.slideUp();
		}
		if (code === 71) { // g
			Shared.goTop();
		}
		if (code === 71 && e.shiftKey) { // G
			Shared.goBottom();
		}
		if (code === 13) { // enter
			Shared.lockOn();
		}
	});



	Shared.applyFrameTriggers();

});

