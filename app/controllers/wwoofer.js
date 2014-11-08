/**
 * Ember controller for wwoofer.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['application'],
    belongsToCurrentUser: function() {
        var currentUserId = this.get('controllers.application.currentUser.id');
        var wwooferUserId = this.get('user.id');
        return currentUserId === wwooferUserId;
    }.property('controllers.application.currentUser.id', 'user.id')
});