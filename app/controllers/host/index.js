/**
 * Ember controller to display a single host.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: 'application',

    /**
     * Indicates whether the current user can edit the host.
     * The user must either own the host or be an admin.
     */
    userCanEditHost: function () {
        var currentUserId = this.get('controllers.application.currentUser.id');
        var currentUserIsAdmin = this.get('controllers.application.currentUserIsAdmin');
        return this.get('user.id') === currentUserId || currentUserIsAdmin;
    }.property('user.id'),

    actions: {
        approveHost: function () {
            // Update status and save the host
            var host = this.get('model');
            host.set('isPending', false);
            host.save().then(function () {
                alertify.success('Host was approved successfully.');
            }).catch(function () {
                alertify.error('Cannot approve host.');
            });
        }
    }
});