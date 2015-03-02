/**
 * Ember helper to convert birth date in age.
 */
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (date) {
    return date ? moment().diff(moment(date), 'years') : null;
});