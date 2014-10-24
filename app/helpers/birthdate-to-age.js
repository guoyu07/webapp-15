/**
 * Ember helper to convert birth date in age.
 */
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (date) {
    if (date instanceof Date) {
        return moment().diff(date, 'years');
    }
});