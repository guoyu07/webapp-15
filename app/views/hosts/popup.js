/**
 * Created by chinow on 2/15/15.
 */
/**
 * Ember view for host popup.
 */
import Ember from "ember";

export default Ember.View.extend({
    templateName: 'hosts/popup',
    properties: Ember.computed.oneWay('context.properties'),

    completeUrl: function () {

        var photoId = this.get('properties.photo');
        if (!Ember.isEmpty(photoId)) {
            return this.container.lookup("store:main").find('photo', photoId);
        }
    }.property('properties.photo')
});

