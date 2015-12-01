/**
 * Ember service for host activities.
 */
import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Service.extend({

  i18n: service('i18n'),

  /**
   * Activity ids.
   */
  activityIds: [
    'ranching',
    'dairy',
    'vineyard',
    'orchard',
    'vegetables',
    'market-gardening',
    'permaculture',
    'grain-farming',
    'forestry',
    'beekeeping',
    'bakery',
    'brewery',
    'foraging'
  ],

  /**
   * List of all activities proposed by the hosts.
   */
  allActivities: computed('activityIds.[]', 'i18n.locale', function() {
    var activities = this.get('activityIds').map((item)=> {
      return Ember.Object.create({
        id: item,
        label: this.get('i18n').t('activities.' + item)
      });
    });

    return activities;
  })
});
