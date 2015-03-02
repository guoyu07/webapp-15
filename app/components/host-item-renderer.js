/**
 * Ember component for host item renderer.
 */
import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * Farm features
     */
    farm: null,

    /**
     * Host Id
     */
    hostId : Ember.computed.readOnly('farm.properties.hostId'),

    /**
     * Farm Name
     */
    farmName: Ember.computed.readOnly('farm.properties.farmName'),

    /**
     * Farm photo Id
     */
    photoId : Ember.computed.readOnly('farm.properties.photo'),

    /**
     * Farm description
     */
    description: Ember.computed.readOnly('farm.properties.description'),

    /**
     * Farm photo object
     */
    photo : function () {
        return this.get('photoId') ? this.container.lookup('store:main').find('photo', this.get('photoId')) : null;
    }.property('photoId')
});