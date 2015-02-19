/**
 * Ember component for host thumb.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    url: null,
    style: function () {
        var self = this;
        if (this.get('url')) {
            // If we have a promise
            if ( Ember.typeOf(this.get('url')) == "instance"){
                this.get('url').then(function (data) {
                    self.set('url', data.get('completeUrl'))
                });
            }
            return 'background-image:url(' + this.get('url') + ');';
        }
    }.property('url')
});