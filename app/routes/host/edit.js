/**
 * Ember route for host edition.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    renderTemplate: function () {
        this.render('host/form', { controller: 'host.edit' });
    }
});
