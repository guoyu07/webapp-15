/**
 * Ember controller to display a single host.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application', 'host'],

    // Bindings
    belongsToCurrentUser: Ember.computed.oneWay('controllers.host.belongsToCurrentUser'),

    /**
     * Indicates whether the host contact info can be displayed to the current user.
     */
    canSeeContactInfo: Ember.computed.readOnly('userMemberships.hasNonExpiredMembership'),

    /**
     * Indicates whether the current user can edit the host.
     * The user must either be the owner of the host profile or be an admin.
     */
    canEditHost: Ember.computed.or('belongsToCurrentUser', 'controllers.application.currentUserIsAdmin')
});
