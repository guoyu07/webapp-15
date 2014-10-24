/**
 * Ember route for User memberships.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var user = this.modelFor('user');
        return user.get('memberships');
    }
});
