/**
 * Ember controller for wwoofer creation.
 */
App.WwoofersNewController = Ember.ObjectController.extend({

    needs: ['countries', 'departments'],

    actions: {
        saveWwoofer: function () {
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');

            // Prevent multiple save attempts
//            if (this.get('isSaving')) {
//                return;
//            }

            // Validate and save
            wwoofer.save()
                .then(function () {
                    address.save()
                        .then(function () {
                            wwoofer.set('address', address);
                            wwoofer.save()
                                .then(function () {
                                    alertify.success('Information updated!');
                                    this.transitionToRoute('wwoofer.edit', wwoofer);
                                }).catch(function () {
                                    alertify.error('Cannot attach address to wwoofer.');
                                });
                        }).catch(function () {
                            alertify.error('Cannot update the address.');
                        });
                }).catch(function () {
                    alertify.error('Cannot update the wwoofer.');
                });
        }
    }
});