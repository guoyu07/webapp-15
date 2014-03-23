/**
 * Created by guillaumez on 3/22/14.
 */

App.LoginController = Ember.Controller.extend({
    actions: {
        login: function() {
            $.post("/login", {
                username: this.get("username"),
                password: this.get("password")
            });
        }
    }
});