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

            // Reset website to null to pass server-side validation (only accept null, and not empty string)
            if (host.get('webSite') === '')
                host.set('webSite', null);

            // Validate and save
            host.save()
                .then(function () {
                    address.save()
                        .then(function () {
                            alertify.success('Host created!');
                        }).catch(function () {
                            // TODO: redirect user to host edit page to complete the form
                        });
                }).catch(function () {
                    alertify.error('Cannot save the host.');
                });
        }
    }
});