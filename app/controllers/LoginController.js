/**
 * Created by guillaumez on 3/22/14.
 */

App.LoginController = Ember.Controller.extend({
    actions: {
        login: function () {
            var self = this;
            $.post("/login", {
                username: this.get("username"),
                password: this.get("password")
            }).then(function (data) {
                    // Store the token in the local storage
                    localStorage["token"] = data.token;

                    // Go to host list
                    self.transitionToRoute('hosts');
                });
        }
    }
});