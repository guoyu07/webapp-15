/**
 * Ember route for users index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function (controller) {
        this.store.find('user').then(function (users) {
            controller.set('model', users);
        });
    }
});