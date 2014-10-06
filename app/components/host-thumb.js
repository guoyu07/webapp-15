/**
 * Ember component for host thumb.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    url: null,
    style: function () {
        if (this.get('url')) {
            return 'background-image:url(' + this.get('url') + ');';
        }
    }.property('url')
});