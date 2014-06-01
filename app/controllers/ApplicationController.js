/**
 * Ember controller for the application.
 */
App.ApplicationController = Ember.Controller.extend({

    /**
     * Gets or sets the authenticated user.
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

    /**
     * Indicates whether the current user is an administrator.
     */
    currentUserIsAdmin: function () {
        var currentuser = this.get('currentUser');
        return currentuser && currentuser.isAdmin;
    }.property('currentUser'),

    actions: {
        logout: function () {

            // Clear the user
            this.set('currentUser', null);

            // Log the user out
            window.location.replace('/logout');
        }
    }
});