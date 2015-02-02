/**
 * Ember route for hosts index.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        department: {
            refreshModel: true
        },
        activities: {
            refreshModel: true
        },
        pendingOnly: {
            refreshModel: true
        }
    },
    beforeModel: function () {
        this.controllerFor('hosts.index').set('isLoading', true);
    },
    model: function (params) {
        return this.store.find('host', params);
    },
    afterModel: function() {
        this.controllerFor('hosts.index').set('isLoading', false);
    },
    renderTemplate: function() {
        Ember.$("#mainContainer").removeClass( "container" ).addClass( "container-fluid" );
        this.render('hosts/index');
        this.render('hosts/map', {   // the template to render
            into: 'hosts/index',                // the template to render into
            outlet: 'map',              // the name of the outlet in that template
            controller: 'hosts'        // the controller to use for the template
        });
    },
    deactivate: function() {
        Ember.$("#mainContainer").removeClass( "container-fluid" ).addClass( "container" );
    },
    actions: {
        searchHosts: function () {
            this.refresh();
        }
    }
});
