module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
 
        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),
 
        // Metadata.
        meta: {
            basePath: '',
            srcPath: 'assets/'
        },
 
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ',
 
        // Task configuration.
        sass: {
          dist: {
            options: {
              style: 'compressed'
            },
            files: {                         
              '<%= meta.srcPath %>/build/application.css': '<%= meta.srcPath %>/sass/application.css.scss'
            }
          },
          dev: {
            options: {
              style: 'expanded'
            },
            files: {                         
              '<%= meta.srcPath %>/build/application.css': '<%= meta.srcPath %>/sass/application.css.scss',
            }
          }
        },



       // uglify: {
       //    options: {
       //      mangle: false
       //    },
       //    my_target: {
       //      files: {
       //        '<%= meta.srcPath %>/build/application.min.js':[
       //          '<%= meta.srcPath %>/javascripts/jquery-jvectormap-1.2.2.min.js',
       //          '<%= meta.srcPath %>/javascripts/jquery-jvectormap-world-mill-en.js',
       //          '<%= meta.srcPath %>/javascripts/application.js',
       //          '<%= meta.srcPath %>/javascripts/gdp-data.js',
       //          '<%= meta.srcPath %>/javascripts/visited.js',
       //          '<%= meta.srcPath %>/javascripts/jquery.easyModal.js',
       //        ]
       //      }
       //    }
       //  },
 
        watch: {
            sass: {
                files: ['<%= meta.srcPath %>/**/*.scss'],
                tasks: ['sass:dev']
            }
            // javascripts: {
            //   files: ['<%= meta.srcPath %>/javascripts/**/*.js'],
            //   tasks: ['uglify']
            // }
        }
 
    });
 
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
 
    // Default task.
    grunt.registerTask('default', ['sass:dev', 'uglify']);

   // Release Task
   grunt.registerTask('build', ['sass:dist', 'uglify']);

};
