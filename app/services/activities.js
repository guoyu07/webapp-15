/**
 * Ember service for host activities.
 */
import Ember from 'ember';

export default Ember.Object.extend({
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
    allActivities: function () {
        var activities = [];
        this.get('activityIds').forEach(function (item) {
            activities.push(Ember.Object.create({
                id: item,
                label: Ember.I18n.t('activities.' + item)
            }));
        });
        return activities;
    }.property()
});
