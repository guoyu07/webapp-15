/**
 * Created by guillaumez on 2/26/14.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return this.modelFor('host');
    }
});