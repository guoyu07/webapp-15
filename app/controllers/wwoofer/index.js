/**
 * Ember controller to display a single wwoofer.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
    /**
     * Indicates whether the notes about the wwoofer should be displayed.
     * Only admin can wwoofer host notes.
     */
    showNote: Ember.computed.and('model.note', 'sessionUser.user.isAdmin'),

    /**
     * Indicate whether the current viewed wwoofer profile is the one of the current logged user
     */
    isLoggedUserProfile: function () {
        return this.get('sessionUser.user.id') === this.get('model.user.id');
    }.property('sessionUser.user.id', 'model.user.id')
});
