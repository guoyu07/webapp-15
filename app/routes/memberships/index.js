/**
 * Ember route for memberships index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return this.store.find('membership', { userId: this.controllerFor('application').get('currentUser.id') });
    },
    setupController: function (controller, model) {
        this.controllerFor('memberships').set('content', model);
    },
    renderTemplate: function () {
        this.render('memberships/index', { controller: 'memberships' });
    }
});