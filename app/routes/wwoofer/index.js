/**
 * Route for wwoofer index.
 */
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    renderTemplate: function() {
        this.render({ into: 'application' });
    }
});
