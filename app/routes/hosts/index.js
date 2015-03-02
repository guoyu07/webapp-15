/**
 * Ember route for hosts index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        department: {
            refreshModel: false
        },
        activities: {
            refreshModel: false
        },
        pendingOnly: {
            refreshModel: false
        }
    },
    renderTemplate: function() {
        // Toggle containerFluid class
        Ember.$("#mainContainer").removeClass( "container" ).addClass( "container-fluid" );

        // Render host.index view
        this.render('hosts/index');

        // Render hosts/map  view inside named outlet "map"
        this.render('hosts/map', {
            into: 'hosts/index',
            outlet: 'map',
            controller: 'hosts/index'
        });
    },
    deactivate: function() {
        // Toggle containerFluid class
        Ember.$("#mainContainer").removeClass( "container-fluid" ).addClass( "container" );
    }
});
