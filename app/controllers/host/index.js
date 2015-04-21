/**
 * Ember controller to display a single host.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    needs: ['host'],

    // Bindings
    belongsToCurrentUser: Ember.computed.oneWay('controllers.host.belongsToCurrentUser'),

    /**
     * Indicates whether the host contact info can be displayed to the current user.
     */
    canSeeContactInfo: Ember.computed.readOnly('userMemberships.hasNonExpiredMembership'),

    /**
     * Indicates whether the notes about the host should be displayed.
     * Only admin can see host notes.
     */
    showNote: Ember.computed.and('model.note', 'session.user.isAdmin')
});
