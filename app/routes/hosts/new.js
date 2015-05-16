/**
 * Ember route for host creation.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    /**
     * Only one host profile allowed per user.
     * Redirects to host edit if the user already has a profile.
     */
    beforeModel: function(transition) {
        this._super(transition);
        var route = this;
        return this.get('session.user').then(function (user) {
            var hostId = user.get('host.id');
            if (hostId) {
                route.transitionTo('host.edit', hostId);
            }
        });
    },
    model: function () {

        // Create a new host record attached to the current logged in user
        var address = this.store.createRecord('address');
        var self = this;
        return this.get('session.user').then(function (user) {
            return self.store.createRecord('host', {
                farmName: "La Ferme de M. Seguin",
                user: user,
                address: address
            });
        });
    },
    renderTemplate: function () {
        this.render('host/form', { controller: 'hosts.new' });
    },
    deactivate: function () {
        this.get('controller.model').rollback();
    }
});
