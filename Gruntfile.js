'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var serveStatic = require('serve-static');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        watch: {
            client: {
                options: {
                    livereload: true
                },
                files: [
                    'app/components/**/*.html',
                    'index.html',
                    'assets/css/*.css',
                    '<%= eslint.target %>'
                ],
                tasks: ['eslint']
            }
        },
        connect: {
            //use this to create connections to backend without cors issues
            proxies: [{
                context: '/jboss-api',
                host: 'localhost',
                port: 8080
            }],
            options: {
                port: 9001,
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    // change to 0.0.0.0 to allow external connections
                    hostname: 'localhost',
                    middleware: function() {
                        return [
                            proxySnippet,
                            serveStatic('.')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    hostname: '0.0.0.0',
                    keepalive : true,
                    middleware: function() {
                        return [
                            proxySnippet,
                            serveStatic('dist')
                        ];
                    }
                }
            }
        },
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            target: [
                'Gruntfile.js',
                'app/**/*.js'
            ]
        },
        clean: [
            '.tmp',
            'dist'
        ],
        copy: {
            main: {
                files : [{
                    expand: true,
                    src: [
                        'app/**/*.html',
                        'index.html',
                        'assets/img/*'
                    ],
                    dest: 'dist/'
                }, {
                    expand: true,
                    flatten: true,
                    src: [
                        'node_modules/patternfly/node_modules/font-awesome/fonts/*',
                        'node_modules/patternfly/dist/fonts/*'
                    ],
                    dest: 'dist/assets/fonts/'
                }]
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: 'dist/index.html'
        }
    });

    grunt.registerTask('default', [
        'dev'
    ]);

    grunt.registerTask('dev', [
        'eslint',
        'configureProxies',
        'connect:livereload',
        'watch:client'
    ]);

    grunt.registerTask('build', [
        'eslint',
        'clean',
        'copy',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin'
    ]);

    grunt.registerTask('prod', [
        'build',
        'configureProxies',
        'connect:dist'
    ]);

};
