/**
 * Ember controller to display a single host.
 */
App.HostIndexController = Ember.ObjectController.extend({

    needs: 'application',

    userCanEditHost: function () {
        return this.get('user.id') == this.get('controllers.application.currentUser.id')
            || this.get('controllers.application.currentUserIsAdmin');
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