import Ember from 'ember';

const { service } = Ember.inject;
const { computed } = Ember;

export default Ember.Service.extend({

  store: service('store'),

  countries: computed(function() {
    return this.get('store').find('country');
  }),

  /**
   * Countries hosts can be attached to.
   */
  hostCountries: computed.filterBy('countries', 'isFrance', true),

  /**
   * Countries sorted by name.
   */
  countriesSorting: ['name'],
  sortedCountries: computed.sort('countries', 'countriesSorting')
});
