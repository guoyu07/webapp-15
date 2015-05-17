/**
 * Ember controller to display a single wwoofer.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
    /**
     * Indicates whether the notes about the wwoofer should be displayed.
     * Only admin can wwoofer host notes.
     */
    showNote: Ember.computed.and('model.note', 'session.user.isAdmin')
});
