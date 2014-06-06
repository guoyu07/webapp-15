/**
 * Ember controller for login.
 */
App.LoginController = Ember.ObjectController.extend(App.Validations.Mixin, {

    needs: 'application',

    actions: {
        login: function () {

            // Validate form then login
            var loginData = this.get('content');
            var self = this;
            loginData.validate().then(function () {
                $.post("/login", {
                    username: loginData.get("username"),
                    password: loginData.get("password")
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
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            });
        }
    }
});