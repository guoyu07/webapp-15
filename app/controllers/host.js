/**
 * Ember controller for host.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['application'],
    belongsToCurrentUser: function() {
        var currentUserId = this.get('controllers.application.currentUser.id');
        var hostUserId = this.get('user.id');
        return currentUserId === hostUserId;
    }.property('controllers.application.currentUser.id', 'user.id')
});