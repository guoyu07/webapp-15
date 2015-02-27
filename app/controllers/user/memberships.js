/**
 * Ember controller for user's memberships.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({

    // Local user memberships service (not singleton)
    localUserMembershipsService: null
});
