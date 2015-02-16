/**
 * Created by MaximeV on 2/8/2015.
 */
/**
 * Ember component for host item renderer.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    farm: null,
    hostId : Ember.computed.readOnly('farm.properties.hostId'),
    farmName: Ember.computed.readOnly('farm.properties.farmName'),
    photoId : Ember.computed.readOnly('farm.properties.photo'),
    description: Ember.computed.readOnly('farm.properties.description'),
    photo : function () {
        return this.get('photoId') ? this.container.lookup('store:main').find('photo', this.get('photoId')) : null;
    }.property('photoId')
});