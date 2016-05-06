
var expireDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var pathConfig = {
        app : 'app',
        dist : 'dist',
        tmp : '.tmp',
        test : 'test'
    };

    grunt.initConfig({
        paths : pathConfig,
        watch : {
            compass: {
                files: ['<%= paths.app %>/sass/{,*/}*.{scss,sass,png,ttf}'],
                tasks: ['compass:server']
            },
            copy: {
                files : ['<%= paths.app %>/javascripts/**'],
                tasks: ['copy:js']
            },
            test : {
                files : [
                    '**/*.js',
                    '!node_modules/**/*.*',
                ],
                options : {
                    spawn : false
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= paths.app %>/sass',
                cssDir: '<%= paths.tmp %>/stylesheets',
                imagesDir: '<%= paths.app %>/sass/images',
                relativeAssets: true
            },
            server: {
                options: {
                    generatedImagesDir: '<%= paths.tmp %>/images',
                    debugInfo: true
                }
            },
            dist: {
                options: {
                    cssDir: '<%= paths.dist %>/stylesheets',
                    generatedImagesDir: '<%= paths.dist %>/images',
                    httpGeneratedImagesPath: '/images/',
                    outputStyle: 'compressed',
                    relativeAssets: false
                }
            }
        },

        clean: {
            server: {
                src: [
                    '<%= paths.tmp %>',
                    '<%= paths.dist %>',
                    '.sass-cache',
                    'gzip',
                ]
            },
            dist: [
                '<%= paths.dist %>',
                '.sass-cache',
                'gzip',
            ],
            afterBuild: [
                '<%= paths.dist %>/images',
                '<%= paths.dist %>/javascripts',
                '<%= paths.dist %>/stylesheets',
                '<%= paths.dist %>/fonts',
                '<%= paths.dist %>/bower_components',
                '<%= paths.dist %>/gzip'
            ]
        },

        useminPrepare: {
            html: ['<%= paths.app %>/views/*.html'],
            css: ['<%= paths.tmp %>/**/*.css'],
            options: {
                dest: '<%= paths.dist %>'
            }
        },

        usemin: {
            html: ['<%= paths.dist %>/**/*.html'],
            css: ['<%= paths.dist %>/**/*.css'],
            options: {
                assetsDirs: ['<%= paths.dist %>'],
                root: '<%= paths.tmp %>',
                dirs: ['<%= paths.dist %>']
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    progressive: true,
                    interlace: true,
                    cwd: '<%= paths.dist %>/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: '<%= paths.dist %>/images'
                }]
            }
        },
        htmlmin: {
            options: {
                collapseWhitespace: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dist %>',
                    src: ['**/*.html'],
                    dest: '<%= paths.dist %>'
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dist %>/stylesheets',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= paths.dist %>/stylesheets',
                    ext: '.min.css'
                }]
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            dist: {
                src: [
                    '<%= paths.dist %>/javascripts/*.js',
                    '<%= paths.dist %>/stylesheets/*.css',
                    '<%= paths.dist %>/images/*.{webp,gif,png,jpg,jpeg}'
                ]
            }
        },
        bump : {
            options : {
                files : ['package.json', 'bower.json'],
                updateConfigs : [],
                commit : true,
                commitMessage : 'Release v%VERSION%',
                commitFiles : ['-a'],
                createTag : true,
                tagName : 'v%VERSION%',
                tagMessage : 'Version %VERSION%',
                push : false
            }
        },
        nodemon : {
            dev : {
                script : 'app/app.js',
                options : {
                    nodeArgs : ['--debug=5859'],
                    ext: 'html,js,scss,css',
                    env : {
                        PORT : '9998'
                    }
                }
            }
        },
        concurrent : {
            server : {
                tasks : ['nodemon:dev', 'node-inspector', 'copy:server', 'compass:server', 'watch'],
                options : {
                    logConcurrentOutput: true
                }
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true,
                preserveComments: /^!/,
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            //dist: {
            //    files: {
            //        '<%= paths.dist %>/javascripts/content.pack.js': [
            //            'bower_components/zepto/zepto.min.js',
            //            'bower_components/moment/moment.js',
            //            'bower_components/moment/locale/zh-cn.js',
            //            'bower_components/campaignSDK/campaignSDK.js',
            //            '<%= paths.app %>/javascripts/jweixin-1.0.0.js',
            //            '<%= paths.app %>/javascripts/content.js',
            //        ]
            //    }
            //}
        },
        compress: {
            gzip: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '<%= paths.dist %>',
                src: ['**/*.js', '**/*.css', '**/*.map'],
                dest: 'gzip/'
            }
        },
        'node-inspector' : {
            custom : {
                options : {
                    'web-port' : 8989,
                    'web-host' : 'localhost',
                    'debug-port' : 5859,
                    'save-live-edit' : true,
                    'stack-trace-limit' : 4
                }
            }
        },
        jshint : {
            options : {
                jshintrc : '.jshintrc',
                ignores : ['**/node_modules/**/*.js']
            },
            test : ['**/*.js']
        },
        copy : {
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>/images',
                    dest: '<%= paths.tmp %>/images',
                    src: ['**']
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components',
                    dest: '<%= paths.tmp %>/bower_components',
                    src: ['**']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>/javascripts',
                    dest: '<%= paths.tmp %>/javascripts',
                    src: ['**']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>/fonts',
                    dest: '<%= paths.tmp %>/fonts',
                    src: ['**']
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>/images',
                    dest: '<%= paths.dist %>/images',
                    src: ['**']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>/fonts',
                    dest: '<%= paths.dist %>/fonts',
                    src: ['**']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>',
                    dest: '<%= paths.dist %>/app',
                    src: [
                        'app.js'
                    ]
                },{
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: '<%= paths.dist %>',
                    src: ['utils/*', 'routes/*', 'bower_components/**']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>/views/',
                    dest: '<%= paths.dist %>/views',
                    src: ['*.html']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: '<%= paths.dist %>',
                    src: [
                        'app.js'
                    ]
                }]
            },
            modules: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules',
                    dest: '<%= paths.dist %>/node_modules',
                    src: [
                        '**'
                    ]
                }]
            },
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>/javascripts/',
                    dest: '<%= paths.tmp %>/javascripts/',
                    src: [
                        '*.js'
                    ]
                }]
            },
            public: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.dist %>/images',
                    dest: '<%= paths.dist %>/public/images',
                    src: ['**']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.dist %>/javascripts',
                    dest: '<%= paths.dist %>/public/javascripts',
                    src: ['**']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.dist %>/stylesheets',
                    dest: '<%= paths.dist %>/public/stylesheets',
                    src: ['**']
                }, { 
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.dist %>/fonts',
                    dest: '<%= paths.dist %>/public/fonts',
                    src: ['**']
                }]
            }
        }
    });

    grunt.registerTask('serve', [
        'clean:server',
        'copy:server',
        'concurrent:server'
    ]);

    /*
    grunt.registerTask('build:staging', [
        'clean:dist',
        'copy:server',
        'copy:dist',
        'compass:dist',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin:dist',
        'imagemin:dist',
        'filerev:dist',
        'usemin',
        // 'cdn:staging',
        'htmlmin:dist',
        'compress:gzip',
        // 'aws_s3:staging',
        'copy:modules',
        'clean:afterBuild'
    ]);
    */

    grunt.registerTask('build:production', [
        'clean:dist',
        'copy:server',
        'copy:dist',
        'compass:dist',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin:dist',
        'imagemin:dist',
        'filerev:dist',
        'usemin',
        'htmlmin:dist',
        'copy:public',
        // 'compress:gzip',
        'copy:modules',
        'clean:afterBuild'
    ]);

    grunt.registerTask('serve:test', [
        'watch'
    ]);

    grunt.registerTask('test:travis', [
        'jshint:test',
        'mochaTest:test'
    ]);

    grunt.registerTask(['update'], [
        'bump-only:patch',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:minor'], [
        'bump-only:minor',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:major'], [
        'bump-only:major',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask('default', []);
};
