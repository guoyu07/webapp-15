/**
 * Ember controller for host creation.
 */
App.HostsNewController = Ember.ObjectController.extend({

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
            address.save()
                .then(function () {
                    host.save()
                        .then(function () {
                            alertify.success('Host created!');
                        }).catch(function () {
                            // Delete the address
                            address.destroyRecord();
                            alertify.error('Cannot create the host.');
                        });
                }).catch(function () {
                    alertify.error('Cannot save the address.');
                });
        }
    }
});