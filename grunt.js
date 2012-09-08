var fs = require('fs');
var prompt = require('prompt');

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['ipsum.js']
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', 'ipsum.js'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Build the Chrome manifest file.
  grunt.registerTask('manifest', 'Builds the Chrome manifest file.', function() {
    var pkg = grunt.config('pkg');

    var manifest = {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      browser_action: {
        default_icon: "icon.png",
        popup: "popup.html"
      }
    };

    fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest));
  });

  // Builds a new version of the plugin.
  grunt.registerTask('build', 'Builds a new version of the Chrome plugin.', function() {
    var done = this.async();
    var schema = {
      properties: {
        bump: {
          pattern: /^[Mmp]$/,
          message: 'Which type of release is this? (Major, minor, patch)',
        }
      }
    };

    prompt.start();
    prompt.get(schema, function (err, result) {
      console.log(result);
      if (result.bump === 'M') {
        grunt.task.run('bump:major');
      }
      else if (result.bump === 'm') {
        grunt.task.run('bump:minor');
      }
      else if (result.bump === 'p') {
        grunt.task.run('bump:patch');
      }
      grunt.task.run('lint min manifest');
      grunt.file.copy('icon.png', 'dist/icon.png');
      grunt.file.copy('popup.html', 'dist/popup.html');
      done();
    });
  });

  // Default task.
  grunt.registerTask('default', 'lint min');

  grunt.loadNpmTasks('grunt-bump');
};
