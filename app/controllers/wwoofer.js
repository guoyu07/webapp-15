/**
 * Ember controller for wwoofer.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['application'],
    belongsToCurrentUser: function() {
        var currentUserId = this.get('session.user.id');
        var wwooferUserId = this.get('user.id');
        return currentUserId === wwooferUserId;
    }.property('session.user.id', 'user.id')
});