/**
 * Created by guillaumez on 3/22/14.
 */

App.LoginController = Ember.Controller.extend({

    needs: 'hosts',

    actions: {
        login: function () {
            var self = this;
            $.post("/api/request_token", {
                username: this.get("username"),
                password: this.get("password")
            }).then(function (data) {
                // Store the token in the local storage
                localStorage["token"] = data.token;

                // Clear the host cache
                // self.get('controllers.hosts.content').reload();

                // Go to host list
                self.transitionToRoute('hosts');
            });
        }
    }
});