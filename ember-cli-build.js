'use strict';

/*jshint node:true*/
/* global require, module */
const mergeTrees = require('broccoli-merge-trees');
const pickFiles = require('broccoli-static-compiler');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      prepend: 'https://d2ede2tjxuzdo4.cloudfront.net/'
    },
    'ember-power-select': {
      theme: 'bootstrap'
    }
  });

  // Bootstrap
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  let bootstrapCssMap = pickFiles('bower_components/bootstrap/dist/css', {
    srcDir: '/',
    files: ['bootstrap.css.map'],
    destDir: '/assets'
  });

  // Put the bootstrap fonts in the place where the bootstrap css expects to find them
  let bootstrapFonts = pickFiles('bower_components/bootstrap/fonts', {
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

  // Leaflet
  app.import('bower_components/leaflet/dist/leaflet.js');
  app.import('bower_components/leaflet/dist/leaflet.css');
  let leaflet = pickFiles('bower_components/leaflet/dist/', {
    srcDir: 'images',
    destDir: '/assets/images'
  });
  app.import('bower_components/leaflet.markercluster/dist/leaflet.markercluster.js');
  app.import('bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css');
  app.import('bower_components/leaflet-plugins/layer/tile/Google.js');

  // Braintree
  app.import('bower_components/braintree-web/dist/braintree.js');

  return mergeTrees([
    bootstrapFonts,
    bootstrapCssMap,
    leaflet,
    app.toTree()
  ]);
};
