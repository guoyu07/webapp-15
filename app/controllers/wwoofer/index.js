/**
 * Ember controller to display a single wwoofer.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application', 'wwoofer', 'memberships'],

    hasWwoofMembershipsBinding: 'controllers.memberships.hasWwoofMemberships',
    latestWwoofMembershipBinding: 'controllers.memberships.latestWwoofMembership',
    belongsToCurrentUserBinding: 'controllers.wwoofer.belongsToCurrentUser'
});