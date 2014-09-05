/**
 * Ember route for the App's login page.
 */
import Ember from 'ember';
import LoginData from '../models/login-data';

export default Ember.Route.extend({
    setupController: function (controller) {
        controller.set('model', LoginData.create());
    }
});