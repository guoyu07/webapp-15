import Ember from 'ember';

export default Ember.Route.extend({

    model: function () {
        // Do not specify a user id to retrieve all memberships (works only if user is an admin)
        return this.store.filter('membership', { offset: 0 }, function (membership) {
            return !membership.get('isExpired') && !membership.get('isStillValidInAMonth');
        });
    },

    actions: {
        sendReminder: function(membership) {
            // Send reminder
            Ember.$.ajax({
                type: 'POST',
                url: '/api/memberships/' + membership.get('id') + '/send-reminder'
            }).done(function (data) {
                // Update reminder sent date so the button get greyed out
                membership.set('reminderSentAt', data.membership.reminderSentAt);

                // Notify user
                alertify.success("Reminder sent to " + membership.get('user.email'));
            }).fail(function () {
                // Notify user
                alertify.error("An error occurred.");
            });
        },
        loadMore: function () {
            // Return early if already loading
            if (this.controller.get('isLoading')) {
                return;
            }

            // Set loading state
            this.controller.set('isLoading', true);

            // Initialize variables
            var newOffset = this.store.metadataFor('membership').offset + 50,
                self = this;

            // Find next page of content and update
            this.store.find('membership', { offset: newOffset }).then(function (memberships) {
                self.controller.get('model').addObjects(memberships);
                self.controller.set('isLoading', false);
            });
        }
    }
});