/**
 * Ember controller for host.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['application'],
    belongsToCurrentUser: function() {
        var currentUserId = this.get('session.user.id');
        var hostUserId = this.get('user.id');
        return currentUserId === hostUserId;
    }.property('session.user.id', 'user.id')
});