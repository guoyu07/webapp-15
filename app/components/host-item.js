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
    photoId : Ember.computed.readOnly('host.properties.photo'),

    /**
     * Host description
     */
    description: Ember.computed.readOnly('host.properties.description'),

    /**
     * Host photo object
     */
    photo : function () {
        return this.get('photoId') ? this.container.lookup('store:main').find('photo', this.get('photoId')) : null;
    }.property('photoId')
});