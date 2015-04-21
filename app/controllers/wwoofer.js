/**
 * Ember controller for wwoofer.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
    belongsToCurrentUser: function() {
        var currentUserId = this.get('session.user.id');
        var wwooferUserId = this.get('model.user.id');
        return currentUserId === wwooferUserId;
    }.property('session.user.id', 'model.user.id')
});
