App.UserEditController = Ember.ObjectController.extend({

    needs: ['memberships'],

    membershipsBinding: 'controllers.memberships.content',

    actions: {
        saveUser: function () {

            var user = this.get('model');

            // Prevent multiple save attempts
//            if (this.get('isSaving')) {
//                return;
//            }

            // Validate and save
            user.save()
                .then(function () {
                    alertify.success('Information updated!');
                }).catch(function () {
                    alertify.error('Something went wrong.');
                });
        }
    }
});