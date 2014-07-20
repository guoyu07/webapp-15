/**
 * Ember route for the application.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        if (this.controllerFor('application').get('isAuthenticated')) {
            return this.store.find('membership', { userId: this.controllerFor('application').get('currentUser.id') });
        }
    },
    setupController: function (controller, model) {
        this.controllerFor('memberships').set('content', model);
    }
});