/**
 * Created by guillaumez on 3/22/14.
 */

App.LoginController = Ember.Controller.extend({

    needs: 'application',

    actions: {
        login: function () {
            var self = this;
            $.post("/api/request_token", {
                username: this.get("username"),
                password: this.get("password")
            }).done(function (data) {

                // Store the token in the local storage
                localStorage["token"] = data.token;
                self.set('controllers.application.currentUser', data.user);

                // TODO: Clear the host cache
                // self.get('controllers.hosts.content').reload();

                // Notify user
                alertify.success("Welcome back!");

                // Go to host list
                self.transitionToRoute('hosts.index');

            }).fail(function (error) {

                // Notify user
                alertify.error("Email address or password incorrect.");
            });
        }
    }
});