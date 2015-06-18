import Ember from 'ember';

export default Ember.Object.extend({

    countries: Ember.computed(function () {
        var store = this.container.lookup('store:main');
        return store.find('country');
    }),

    /**
     * Countries that hosts can be attached to.
     */
    hostCountries: Ember.computed.filterBy('countries', 'isFrance', true),

    /**
     * Countries sorted by name.
     */
    countriesSorting: ['name'],
    sortedCountries: Ember.computed.sort('countries', 'countriesSorting')
});
