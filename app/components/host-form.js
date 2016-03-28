import Ember from 'ember';

export default Ember.Component.extend({
  activitiesService: Ember.inject.service('activities'),
  monthsService: Ember.inject.service('months'),
  staysService: Ember.inject.service('stays'),
  lodgingsService: Ember.inject.service('lodgings')
});
