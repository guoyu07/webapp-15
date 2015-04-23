/**
 * Ember view for host popup.
 */
import Ember from "ember";

export default Ember.View.extend({
    templateName: 'hosts/popup',
    properties: Ember.computed.oneWay('context.properties'),

    /**
     * Farm photo complete URL
     */
    photo: function () {
        var photoId = this.get('properties.photoId');
        if (!Ember.isEmpty(photoId)) {
            return this.container.lookup("store:main").find('photo', photoId);
        }
    }.property('properties.photoId')
});

