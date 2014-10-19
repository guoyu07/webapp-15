/**
 * Ember controller for countries.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    model: [],

    /**
     * Countries that hosts can be attached to.
     */
    hostCountries:  Ember.computed.filterBy('model', 'isFrance', true)
});