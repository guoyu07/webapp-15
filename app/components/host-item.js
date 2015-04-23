/**
 * Ember component for host item renderer.
 */
import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * Host features
     */
    host: null,

    /**
     * Host Id
     */
    hostId : Ember.computed.readOnly('host.properties.hostId'),

    /**
     * Host farm name
     */
    farmName: Ember.computed.readOnly('host.properties.farmName'),

    /**
     * Host photo Id
     */
    photoId : Ember.computed.readOnly('host.properties.photoId'),

    /**
     * Host description
     */
    description: Ember.computed.readOnly('host.properties.description'),

    /**
     * Host photo object
     */
    photo : function () {
        var photoId = this.get('photoId');
        if (photoId) {
            return this.container.lookup('store:main').find('photo', photoId);
        }
    }.property('photoId')
});
