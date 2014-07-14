/**
 * Ember helper to diplay errors underneath form fields.
 */
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (errors) {
    if (errors && errors.get('length')) {
        var html = '<span class="error">%@</span>'.fmt(errors.get('firstObject'));
        return new Ember.Handlebars.SafeString(html);
    } else {
        return "";
    }
}, '@each');
