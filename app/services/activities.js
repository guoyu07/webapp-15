/**
 * Ember service for host activities.
 */
import Ember from 'ember';

export default Ember.Service.extend({
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
  allActivities: function() {
    var activities = this.get('activityIds').map(function(item) {
      return Ember.Object.create({
        id: item,
        label: Ember.I18n.t('activities.' + item)
      });
    });

    return activities;
  }.property()
});
