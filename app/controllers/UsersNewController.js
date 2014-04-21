App.UsersNewController = Ember.ObjectController.extend({
    actions: {
        saveUser: function () {
            var content = this.get('content');

            content.save().then(null, function () {
                content.rollback();
                alertify.alert("We sent you an email with a confirmation link. See you in a bit :)");
            });
        }
    }
});