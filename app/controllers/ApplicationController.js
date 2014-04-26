/**
 * Created by guillaumez on 3/30/2014.
 */
App.ApplicationController = Ember.Controller.extend({

    /**
     * The currently logged in user.
     */
    currentUser: function (key, value) {

        // Set the connected user
        if (arguments.length > 1) {
            if (value)
                localStorage["user"] = JSON.stringify(value);
            else
                localStorage.removeItem("user");
        }

        // Get the connected user from local storage (if any)
        return localStorage["user"]
            ? JSON.parse(localStorage["user"])
            : null;
    }.property(),

    actions: {
        logout: function () {

            // Clear token and user
            localStorage.removeItem("token");
            this.set('currentUser', null);

            // Notify user
            alertify.success("See you soon!");

            // Go to host list (refresh the page to get fresh data from the API)
            window.location.replace('/app/login');
        }
    }
});