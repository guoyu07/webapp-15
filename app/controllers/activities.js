/**
 * Ember controller for host activities.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    /**
     * List of all activities proposed by the hosts.
     */
    allActivities: [
        'husbandry',
        'market-gardening',
        'transformation',
        'fields',
        'wood',
        'picking',
        'eco-construction',
        'alternative-technologies'
    ]
});