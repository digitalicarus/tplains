/*global define,require,Backbone,$,_*/
/*jshint bitwise:false*/
require.config({
	urlArgs: 'bust=' + ((Math.random() * 1e9)>>0),
	paths: {
		backbone:       'vendor/backbone-min',
		underscore:     'vendor/underscore-min',
		prism:          'vendor/prism',
		jquery:         'vendor/jquery-2.0.3.min',
		matchmedia:     'vendor/matchMedia',
		fastclick:      'vendor/fastclick',
		scrollfix:      'vendor/scrollfix',
		dot:            'vendor/doT.min',
		hammerjq:       'vendor/jquery.hammer.min',
		bootstrap:      'vendor/bootstrap',
		text:           'vendor/require/text',
		jqcustomscroll: 'vendor/jquery.mCustomScrollbar.min',
		scrollto:       'lib/scrollto'
	},
	shim: {
		underscore: {
			init: function() {
				"use strict";
				return this._.noConflict();
			}
		},
		jquery: {
			init: function() {
				"use strict";
				return this.$.noConflict();
			}
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			init: function () {
				"use strict";
				return this.Backbone.noConflict();
			}
		},
		prism: {
			exports: 'Prism'
		},
		dot: {
			exports: 'doT'
		},
		matchmedia: {
			exports: 'matchMedia'
		},
		fastclick: {
			exports: 'FastClick'
		},
		bootstrap: {
			deps: ['jquery']
		},
		hammerjq: {
			deps: ['jquery']
		},
		scrollto: {
			deps: ['jquery']
		}
	}
});

define(['prism'], function (prism) {
	"use strict";
	prism.highlightAll();
	require(['app'], function (app) {});
});

