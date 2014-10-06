/**
 * Created by guillaumez on 2/26/14.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return this.modelFor('host');
    },
    setupController: function (controller, model) {

        // Call base method
        this._super(controller, model);

        // Prepare URL
        var adapter = this.store.adapterFor('application'),
            url = [ adapter.get('host'), adapter.get('namespace'), 'addresses', model.get('address.id'), 'get-coordinates' ].join('/');

        // Get the coordinates of the map
        var get = Ember.$.get(url);
        get.done(function (data) {
            controller.set('coordinates', data.coordinates);
        });
        get.fail(function () {
            // Unable to get coordinates: display random location in France
            controller.set('coordinates', { lat: 46, lng: 3 });
        });
    }
});