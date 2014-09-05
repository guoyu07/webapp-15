/**
 * Ember route for hosts.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function (controller, model) {
        this._super(controller, model);
        this.controllerFor('countries').set('model', this.store.find('country'));
        this.controllerFor('departments').set('model', this.store.find('department'));
    }
});