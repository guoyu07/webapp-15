import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Component.extend({
  countriesService: service('countries'),

  countries: null,

  _countries: computed('countries', 'countriesService.sortedCountries', function() {
    return this.get('countries') || this.get('countriesService.sortedCountries');
  })
});
