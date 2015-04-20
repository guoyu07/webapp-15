/* global require, module */

var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
    fingerprint: {
        prepend: 'https://d50ylagdb72pm.cloudfront.net/'
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

// Moment
app.import('bower_components/moment/moment.js');
app.import('bower_components/moment/locale/fr.js');

// jQuery Cookie
app.import('bower_components/jquery-cookie/jquery.cookie.js');

// Alertify
var alertify = pickFiles('bower_components/alertify.js/lib', {
    srcDir: '/',
    files: ['alertify.js'],
    destDir: '/assets'
});
app.import('bower_components/alertify.js/themes/alertify.core.css');
app.import('bower_components/alertify.js/themes/alertify.bootstrap.css');

// JQuery file upload
// See: https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin
app.import('bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js');
app.import('bower_components/jquery-file-upload/js/jquery.iframe-transport.js');
app.import('bower_components/jquery-file-upload/js/jquery.fileupload.js');

// Ember i18n
app.import('bower_components/ember-i18n/lib/i18n.js');
app.import('bower_components/ember-i18n/lib/i18n-plurals.js');

// Ember leaflet
app.import('bower_components/ember-leaflet/dist/ember-leaflet.js');

// Leaflet providers
app.import("bower_components/leaflet-providers/leaflet-providers.js");

// TrackJs
app.import("bower_components/trackjs/tracker.js");

module.exports = mergeTrees([
    alertify,
    bootstrapFonts,
    bootstrapCssMap,
    app.toTree()
]);
