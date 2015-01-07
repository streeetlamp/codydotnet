module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
          dist: {
            options: {
              cssDir: '_site/css',
              sassDir: '_sass',
              environment: 'development',
              relativeAssets: true,
              outputStyle: 'expanded',
              raw: 'preferred_syntax = :scss\n',
              require: ['susy','breakpoint']
            }
          }
        },

        watch: {
            // scss: {
            //   files: ['app/scss/**/*.scss'],
            //   tasks: ['compass']
            // },
            css: {
                files: ['_site/css/*.css']
            },
            js: {
                files: ['js/**/*.js','!js/main.js'],
                tasks: ['concat']
            },
            // html: {
            //     files: ['app/include/**/*.html'],
            //     tasks: ['includes:dev']
            // },
            livereload: {
                files: ['_site/**/*.html', '_site/**/*.js', '_site/**/*.css'],
                options: { livereload: true }
            }
        },


        autoprefixer: {
            dist: {
                files: {
                    'build/css/style.css' : 'app/css/style.css'
                }
            }
        },

        cmq: {
            your_target: { 
                files: {
                    'build/css/style.css' : 'build/css/style.css'
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'build/css/style.css': ['build/css/style.css']
                }
            }
        },

        jshint: {
            all: [
                'app/js/*.js'
            ],
            options: {
                jshintrc: 'app/js/.jshintrc'
            }
        },

        concat: {   
            scripts: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/scripts.js'  // This specific file
                ],
                dest: 'js/main.js',
            }
        },

        uglify: {
            scripts: {
                src: 'app/js/main.js',
                dest: 'build/js/main.js'
            },
            modernizr: {
                src: 'app/js/modernizr.2.8.3.min.js',
                dest: 'build/js/modernizr.2.8.3.min.js'
            }
        },

        htmlmin: {                                     // Task
          dist: {                                      // Target
            options: {                                 // Target options
              removeComments: true,
              collapseWhitespace: true
            },
            files: [{                                   // Dictionary of files
                expand: true,     // Enable dynamic expansion.
                cwd: 'build/',      // Src matches are relative to this path.
                src: ['**/*.html'], // Actual pattern(s) to match.
                dest: 'build/',   // Destination path prefix.
                ext: '.html',   // Dest filepaths will have this extension.
            }]
          }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/img/',
                    src: ['**/*.{png,jpg,gif,svg,ico}'],
                    dest: 'build/img/'
                }]
            }
        },

        devcode : {
          options :
          {
            html: true,        // html files parsing?
            js: true,          // javascript files parsing?
            css: true,         // css files parsing?
            clean: true,       // removes devcode comments even if code was not removed
            block: {
              open: 'devcode', // with this string we open a block of code
              close: 'endcode' // with this string we close a block of code
            },
            dest: 'dist'       // default destination which overwrites environment variable
          },
          dist : {             // settings for task used with 'devcode:dist'
            options: {
                source: 'build/',
                dest: 'build/',
                env: 'production',
                block: {
                  open: 'devcode', // with this string we open a block of code
                  close: 'endcode' // with this string we close a block of code
                },
            }
          }
        },

        concurrent: {
            watch: {
                tasks: ['watch', 'compass'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },


    });

    // 3. Where we tell Grunt we plan to use this plug-in.

    // Sass
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // JS
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Images
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // html
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Text Replacements
    grunt.loadNpmTasks('grunt-devcode');
   
    // Browser Reload + File Watch
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

    grunt.registerTask('init', ['compass','concat']);

    // Run our devleoppment environment
    grunt.registerTask('dev', ['watch']);

    // cleans directories, does everything for css, js, and images for deploy
    grunt.registerTask('build', ['imagemin', 'compass:dist', 'autoprefixer', 'cmq', 'cssmin', 'concat', 'uglify','devcode:dist','htmlmin']);

};
