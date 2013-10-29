/*jshint node:true*/
var hints = require('cjson').load('./.jshintrc');

module.exports = function(grunt) {
	"use strict";

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
				'Gruntfile.js',
				'<%= pkg.jsRoot %>/*.js',
				'<%= pkg.jsRoot %>/lib/*.js',
				'<%= pkg.jsRoot %>/view/*.js',
				'<%= pkg.jsRoot %>/data/*.js'
			],
			options: hints
		},
		less: {
			dev: {
				options: {
				},
				files: {
					'<%= pkg.cssRoot %>/main.css': '<%= pkg.cssRoot %>/main.less'
				}
			},
			prod: {
				options: {
					yuicompress: true
				},
				files: {
					'<%= pkg.cssRoot %>/main.css': '<%= pkg.cssRoot %>/main.less'
				}
			}
		},
		watch: {
			files: [
				'<%= jshint.files %>',
				'<%= pkg.cssRoot %>' + '/*.less'
			],
			tasks: ['jshint', 'less:dev']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['jshint', 'less:dev']);

};


