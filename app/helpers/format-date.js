/**
 * Ember helper to diplay dates in a human readable format.
 */
Ember.Handlebars.registerBoundHelper('format-date', function (date, options) {
    var format = options.hash.format ? options.hash.format : 'LL';
    return moment(date).format(format);
});