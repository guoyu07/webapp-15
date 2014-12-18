/**
 * Ember controller for host activities.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    /**
     * Activity ids.
     */
    activityIds: [
        'ranching',
        'dairy',
        'vineyard',
        'orchard',
        'vegetables',
        'forestry',
        'grain-farming',
        'permaculture',
        'beekeeping',
        'bakery'
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
