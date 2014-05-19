/**
 * Ember controller for login.
 */
App.LoginController = Ember.Controller.extend({

    needs: 'application',

    actions: {
        login: function () {
            var self = this;
            $.post("/login", {
                username: this.get("username"),
                password: this.get("password")
            }).done(function (data) {

                // Store the token in the local storage
                self.set('controllers.application.currentUser', data.user);

                // Notify user
                alertify.success("Welcome back!");

                // Go to host list (refresh the page to get fresh data from the API)
                window.location.replace('/app');

            }).fail(function () {

                // Notify user
                alertify.error("The email address or password is incorrect.");
            });
        }
    }
});