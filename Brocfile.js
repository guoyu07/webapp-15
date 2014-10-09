/* global require, module */

var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Bootstrap
app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
var bootstrapCssMap = pickFiles('bower_components/bootstrap/dist/css', {
    srcDir: '/',
    files: ['bootstrap.css.map'],
    destDir: '/assets'
});

// Put the bootstrap fonts in the place where the bootstrap css expects to find them
var bootstrapFonts = pickFiles('bower_components/bootstrap/fonts', {
    srcDir: '/',
    destDir: '/fonts'
});

// Ember validations
app.import('bower_components/ember-validations/index.js');

// Moment
app.import('bower_components/moment/moment.js');

// Alertify
var alertify = pickFiles('bower_components/alertify.js/lib', {
    srcDir: '/',
    files: ['alertify.js'],
    destDir: '/assets'
});
app.import('bower_components/alertify.js/themes/alertify.core.css');
app.import('bower_components/alertify.js/themes/alertify.bootstrap.css');

// Bootstrap Datetime picker
app.import('bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js');
app.import('bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css');

// JQuery file upload
// See: https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin
app.import('bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js');
app.import('bower_components/jquery-file-upload/js/jquery.iframe-transport.js');
app.import('bower_components/jquery-file-upload/js/jquery.fileupload.js');

// Swipeshow gallery
app.import('bower_components/swipeshow/jquery.swipeshow.js');
app.import('bower_components/swipeshow/jquery.swipeshow.css');

// Ember i18n
app.import('bower_components/cldr/plurals.js');
app.import('bower_components/ember-i18n/lib/i18n.js');

module.exports = mergeTrees([
    alertify,
    bootstrapFonts,
    bootstrapCssMap,
    app.toTree()
]);