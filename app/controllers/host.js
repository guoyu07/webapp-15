/**
 * Ember controller for host.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
    belongsToCurrentUser: function() {
        var currentUserId = this.get('session.user.id');
        var hostUserId = this.get('model.user.id');
        return currentUserId === hostUserId;
    }.property('session.user.id', 'model.user.id')
});
