import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Service.extend({

    store: service('store'),

    countries: Ember.computed(function () {
        return this.get('store').find('country');
    }),

    /**
     * Countries hosts can be attached to.
     */
    hostCountries: Ember.computed.filterBy('countries', 'isFrance', true),

    /**
     * Countries sorted by name.
     */
    countriesSorting: ['name'],
    sortedCountries: Ember.computed.sort('countries', 'countriesSorting')
});
