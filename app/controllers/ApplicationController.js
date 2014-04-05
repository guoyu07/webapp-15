/**
 * Created by guillaumez on 3/30/2014.
 */

App.ApplicationController = Ember.Controller.extend({
    actions: {
        logout: function () {

            // Clear token
            localStorage.removeItem("token");

            // Go to host list
            this.transitionToRoute('hosts');
        }
    }
});