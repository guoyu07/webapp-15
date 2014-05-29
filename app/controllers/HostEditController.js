App.HostEditController = Ember.ObjectController.extend({

    needs: ['countries', 'departments'],

    actions: {
        saveHost: function () {
            var host = this.get('model');
            var address = host.get('address');

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Initialize validations array
            var validations = Ember.makeArray(host.validate());
            validations.push(address.validate());

            // Validate host and address
            var self = this;
            Ember.RSVP.all(validations).then(function () {

                // Prepare update promises
                var updates = Ember.makeArray(host.save());
                updates.push(address.save());

                // Update host and address
                Ember.RSVP.all(updates).then(function () {
                    alertify.success('Information updated!');
                    self.transitionToRoute('host', host);
                }).catch(function () {
                    alertify.error('Cannot update the address.');
                })
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            })
        }
    }
});