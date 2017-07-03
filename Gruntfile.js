'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
    clean: {
      options: {
        force: true
      },
      dist: ['dist/**']
    },
    copy: {
      src: {
        expand: true,
        cwd: 'src/',
        src: ['**/*', '!js/**', '!style/**'],
        dest: 'dist/'
      },
      resource: {
        expand: true,
        cwd: 'src',
        src: ['resource/**/*'],
        dest: 'dist/'
      }
    },
    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", {
              sourceMap: true,
              sourceType: 'module',
              "presets": ["es2015"]
            }]
          ]
        },
        files: {
          'dist/js/app.js': ['src/js/main.js']
        }
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      src: {
        files: {
          'dist/css/main.css': 'src/style/import.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          open: 'http://localhost:9001',
          hostname: '127.0.0.1',
          livereload: true,
          port: 9001,
          base: {
            path: 'dist',
            options: {
              index: 'index.html'
            }

          }
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['dist']

      },
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['sass']

      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy:src']

      }
    }
  });

  grunt.registerTask('dist', ['clean:dist','copy:resource', 'sass', 'copy:src', 'browserify']);
  grunt.registerTask('default', ['dist', 'connect', 'watch']);

};
