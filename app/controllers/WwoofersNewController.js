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
                            wwoofer.set('address', address);
                            return wwoofer.save();
                        }).then(function () {
                            alertify.success('Information updated!');
                            self.transitionToRoute('wwoofer.membership', wwoofer);
                        }).catch(function (error) {
                            console.error(error);
                            alertify.error('Cannot create wwoofer.');
                        });
                }).catch(function () {
                    alertify.error("Your submission is invalid.");
                })
        }
    }
});