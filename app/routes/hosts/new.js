/**
 * Ember route for host creation.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var address = this.store.createRecord('address');
        return this.store.createRecord('host', {
            farmName: "La Ferme de M. Seguin",
            address: address
        });
    }
});