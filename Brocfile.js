/* global require, module */

var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Bootstrap
app.import('vendor/bootstrap/dist/js/bootstrap.js');
app.import('vendor/bootstrap/dist/css/bootstrap.css');

// Ember validations
app.import('vendor/ember-validations/index.js');

// Moment
app.import('vendor/moment/moment.js');

// Alertify
var alertify = pickFiles('vendor/alertify.js/lib', {
    srcDir: '/',
    files: ['alertify.js'],
    destDir: '/assets'
});
app.import('vendor/alertify.js/themes/alertify.core.css');
app.import('vendor/alertify.js/themes/alertify.bootstrap.css');

// Bootstrap Datetime picker
app.import('vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js');
app.import('vendor/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css');

// JQuery file upload
// See: https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin
app.import('vendor/jquery-file-upload/js/vendor/jquery.ui.widget.js');
app.import('vendor/jquery-file-upload/js/jquery.iframe-transport.js');
app.import('vendor/jquery-file-upload/js/jquery.fileupload.js');

// Swipeshow gallery
app.import('vendor/swipeshow/jquery.swipeshow.js');
app.import('vendor/swipeshow/jquery.swipeshow.css');

// Ember i18n
app.import('vendor/ember-i18n/lib/i18n.js');
// app.import('vendor/cldr/plurals.js');

module.exports = mergeTrees([
    alertify,
    app.toTree()
]);