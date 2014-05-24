/**
 * Ember controller for wwoofer edition.
 */
App.WwooferEditController = Ember.ObjectController.extend({

    needs: ['countries', 'departments'],

    actions: {
        saveWwoofer: function () {
            var wwoofer = this.get('model');
            var address = wwoofer.get('address');

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Save the wwoofer and its address
            var self = this;
            wwoofer.validate()
                .then(function () {
                    return address.validate();
                }).then(function () {
                    wwoofer.save()
                        .then(function () {
                            return address.save();
                        }).then(function () {
                            alertify.success('Information updated!');
                            self.transitionToRoute('application');
                        }).catch(function (error) {
                            console.error(error);
                            alertify.error('Cannot update wwoofer.');
                        });
                }).catch(function () {
                    alertify.error("Your submission is invalid.");
                })
        }
    }

});