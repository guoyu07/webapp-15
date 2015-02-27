/**
 * Ember route for wwoofer creation.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function () {

        // Create a new wwoofer record attached to the current logged in user
        var address = this.store.createRecord('address');
        var self = this;
        return this.get('session.user').then(function (user) {
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
