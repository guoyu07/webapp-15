exports.config =
  files:
    javascripts:
      joinTo: 'app.js': /^(app|vendor|bower_components)/
      order:
        before: [
          'bower_components/jquery/jquery.js'
          'bower_components/handlebars/handlebars.js'
          'bower_components/ember/ember.js'
          'bower_components/ember-data-shim/ember-data.js'
          'vendor/jquery.ui.widget.js'
          'vendor/jquery.iframe-transport.js'
          'vendor/jquery.fileupload.js'
        ]
    stylesheets:
      joinTo: 'app.css': /^(app|vendor|bower_components)/
    templates:
      precompile: true
      root: 'templates'
      joinTo: 'app.js': /^app/