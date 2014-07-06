/**
 * Ember controller for user edition.
 */
App.UserEditController = Ember.ObjectController.extend({
    actions: {
        saveUser: function () {

            var user = this.get('model');

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Validate and save
            user.validate().then(function () {
                user.save()
                    .then(function () {
                        alertify.success('Information updated!');
                    }).catch(function () {
                        alertify.error('Something went wrong.');
                    });
            }).catch(function (error) {
                console.log(error);
                alertify.error("Your submission is invalid.");
            })
        }
    }
});