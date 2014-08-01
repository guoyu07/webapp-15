/**
 * Ember controller for the application.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

    /**
     * Gets or sets the authenticated user.
     */
    currentUser: function (key, value) {

        // Set the connected user
        if (arguments.length > 1) {
            if (value) {
                localStorage["user"] = JSON.stringify(value);
            } else {
                localStorage.removeItem("user");
            }
        }

        // Get the connected user from local storage (if any)
        return localStorage["user"] ? JSON.parse(localStorage["user"]) : null;
    }.property(),

    /**
     * Indicates whether the current user is authenticated.
     */
    isAuthenticated: Ember.computed.notEmpty('currentUser'),

    /**
     * Indicates whether the current user is anonymous.
     */
    isAnonymous: Ember.computed.not('isAuthenticated'),

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

            // Logs the user out and refresh the page
            Ember.$.ajax({
                type: 'POST',
                url: '/api/users/logout'
            }).done(function () {
                // Go to home page (refresh the page to get fresh data from the API)
                window.location.replace(WebappENV.baseUrl);
            }).fail(function () {
                // Notify user
                alertify.error("Something went wrong.");
            });
        }
    }
});