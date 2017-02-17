import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  onlyGreenBuildingEnabled: computed('host.activities.[]', function () {
    let activities = this.get('host.activities');
    return activities.get('length') === 1 && activities.includes('green-building');
  }),

  activitiesService: Ember.inject.service('activities'),
  monthsService: Ember.inject.service('months'),
  staysService: Ember.inject.service('stays'),
  lodgingsService: Ember.inject.service('lodgings')
});
