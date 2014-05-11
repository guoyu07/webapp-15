/**
 * Ember controller to display a single host.
 */
App.HostIndexController = Ember.ObjectController.extend({

    needs: 'application',

    userCanEditHost: function () {
        return this.get('user.id') == this.get('controllers.application.currentUser.id');
    }.property('user.id')
});