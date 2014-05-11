App.HostEditController = Ember.ObjectController.extend({

    needs: ['countries', 'departments'],

    actions: {
        saveHost: function () {
            var host = this.get('model');
            var address = host.get('address');

            // Prevent multiple save attempts
//            if (this.get('isSaving')) {
//                return;
//            }

            // Validate and save
            host.save()
                .then(function () {
                    address.save()
                        .then(function () {
                            alertify.success('Information updated!');
                        }).catch(function () {
                            alertify.error('Cannot update the address.');
                        });
                }).catch(function () {
                    alertify.error('Cannot update the host.');
                });
        }
    }
});