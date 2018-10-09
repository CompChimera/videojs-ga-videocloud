'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*\n* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Based on videojs-ga 0.4.2\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            '* Licensed <%= pkg.license %>\n*/',
    clean: {
      files: ['demo/js']
    },
    coffee: {
      compile: {
        files: {
          'demo/js/videojs.ga.videocloud.js': 'src/videojs.ga.coffee',
        }
      }
    },
    uglify: {
      dist: {
        src: 'demo/js/videojs.ga.videocloud.js',
        dest: 'demo/js/videojs.ga.videocloud.min.js'
      },
    },
    usebanner: {
      taskName: {
        options: { banner: '<%= banner %>' },
        files: { src: [ 'dist/*' ] }
      }
    },
    // Grunt express - our webserver
    // https://github.com/blai/grunt-express
    express: {
      all: {
          options: {
              bases: ['./demo'],
              port: 9000,
              livereload: true
          }
      }
    },

    // grunt-watch will monitor the projects files
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      all: {
              files: 'dist/*',
              options: {
                  livereload: true
          }
      },
      js:{
        files: ["src/*"],
        tasks: ['clean', 'coffee', 'uglify', 'usebanner']
      }
    },
    // grunt-open will open your browser at the project's URL
    // https://www.npmjs.org/package/grunt-open
    open: {
        all: {
            path: 'http://localhost:8080/index.html'
        }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-open');

  // Default task.
  grunt.registerTask('default', ['clean', 'coffee', 'uglify', 'usebanner']);

// Creates the `server` task
grunt.registerTask('server', [
  'express',
  'open',
  'watch'
  ]);

};
