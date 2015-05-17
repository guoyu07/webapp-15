/**
 * Ember route for wwoofer creation.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    /**
     * Only one wwoofer profile allowed per user.
     * Redirects to wwoofer edit if the user already has a profile.
     */
    beforeModel: function(transition) {
        this._super(transition);
        var route = this;
        return this.get('session.user').then(function (user) {
            var wwooferId = user.get('wwoofer.id');
            if (wwooferId) {
                route.transitionTo('wwoofer.edit', wwooferId);
            }
        });
    },
    model: function () {

        // Create a new wwoofer record attached to the current logged in user
        var self = this;
        return this.get('session.user').then(function (user) {
            var address = self.store.createRecord('address');
            return self.store.createRecord('wwoofer', {
                user: user,
                address: address
            });
        });
    },
    renderTemplate: function () {
        this.render('wwoofer/form', { controller: 'wwoofers.new' });
    },
    deactivate: function () {
        this.get('controller.model').rollback();
    }
});
