/**
 * Ember controller for host activities.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    /**
     * List of all activities proposed by the hosts.
     */
    allActivities: [
        'ranching',
        'dairy',
        'vineyard',
        'orchard',
        'vegetables',
        'forestry',
        'grain-farming',
        'permaculture'
    ]
});