App.HostEditController = Ember.ObjectController.extend({

    needs: ['hosts', 'departments'],

    actions: {
        saveHost: function () {

            // Prevent multiple save attempts
            if (this.get('isSaving')) {
                return;
            }

            // Get host and address
            var host = this.get('model');
            var address = host.get('address');

            // Reset website to null to pass server-side validation (only accept null, and not empty string)
            if (host.get('webSite') === '')
                host.set('webSite', null);

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
                    alertify.error('Cannot update the host.');
                })
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            })
        }
    }
});