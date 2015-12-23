/*jshint node:true*/
/* global require, module */
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      prepend: 'https://d2ede2tjxuzdo4.cloudfront.net/'
    },
    'ember-power-select': {
      theme: 'bootstrap'
    }
  });

  // Bootstrap
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  var bootstrapCssMap = pickFiles('bower_components/bootstrap/dist/css', {
    srcDir: '/',
    files: ['bootstrap.css.map'],
    destDir: '/assets'
  });

  // Put the bootstrap fonts in the place where the bootstrap css expects to find them
  var bootstrapFonts = pickFiles('bower_components/bootstrap/fonts', {
    srcDir: '/',
    destDir: '/assets/fonts'
  });

  // jQuery Cookie
  app.import('bower_components/jquery-cookie/jquery.cookie.js');

  // JQuery file upload
  // See: https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin
  app.import('bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js');
  app.import('bower_components/jquery-file-upload/js/jquery.iframe-transport.js');
  app.import('bower_components/jquery-file-upload/js/jquery.fileupload.js');

  // Ember leaflet
  app.import('bower_components/leaflet/dist/leaflet-src.js');
  app.import('bower_components/leaflet/dist/leaflet.css');
  app.import('bower_components/leaflet.markercluster/dist/leaflet.markercluster-src.js');
  app.import('bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css');
  var leaflet = pickFiles('bower_components/leaflet/dist/', {
    srcDir: 'images',
    destDir: '/assets/images'
  });

  // Leaflet providers
  app.import("bower_components/leaflet-providers/leaflet-providers.js");

  // TrackJs
  app.import("bower_components/trackjs/tracker.js");

  return mergeTrees([
    bootstrapFonts,
    bootstrapCssMap,
    leaflet,
    app.toTree()
  ]);
};
