module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        ignores: [],
        indent: 2,
        asi: true, // This option suppresses warnings about missing semicolons
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          define: true
        }
      },
      all: ['Gruntfile.js', 'public/js/*.js', 'app/**/*.js', 'config/**/*.js']
    },
    compass: {
      options: {
        sassDir: 'public/sass',
        cssDir: 'public/css',
        imagesDir: 'public/img',
        javascriptDir: 'public/js',
        fontsDir: 'public/fonts'
      },
      dev: {
        options: {
          outputStyle: 'expanded'
        }
      },
      production: {
        options: {
          outputStyle: 'compressed'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: 'public',
          baseUrl: 'js',
          dir: 'publicbuild',
          mainConfigFile: 'public/js/main.js',
          modules: [{
            name: 'main'
          }],
          locale: '<%= pkg.locale %>',
          optimizeCss: 'standard',
          uglify: {
            defines: {
              DBG: ['name', 'false']
            }
          }
        }
      }
    },
    watch: {
      compass: {
        files: ['public/sass/**/*.scss'],
        tasks: ['compass:dev']
      },
      jshint: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['jshint', 'compass:production', 'requirejs']);

};