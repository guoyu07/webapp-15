/**
 * Ember helper to diplay dates in a human readable format.
 */
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (date, options) {
    var format = options.hash.format ? options.hash.format : 'LL';
    var momentDate = moment(date);
    return momentDate.isValid() ? momentDate.format(format) : null;
});
