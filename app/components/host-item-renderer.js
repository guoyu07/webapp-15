/**
 * Created by MaximeV on 2/8/2015.
 */
/**
 * Ember component for host item renderer.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    farm: null,
    farmName: Ember.computed.readOnly('farm.properties.farmName'),
    photos : null,
    fullDescription: "lorem ipsum"
});