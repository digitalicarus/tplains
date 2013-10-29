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
	setTimeout(Shared.resize, 500);

  
	$('main').on('scroll', function (e) {
		var scrollTop = parseInt($(this).scrollTop(), 10)
		,   posDiff = null
		,   currPos = null
		;

		$sections.each(function (i, v) {
			currPos = parseInt($(v).position().top, 10);
			posDiff = currPos - scrollTop;
			//console.log(currPos, scrollTop, posDiff);
			if (posDiff <= 70) {
				//console.log('hit: ' + i);
				return false; // reportedly breaks out of each
			}
		});
	});

	Shared.applyFrameTriggers();

});

