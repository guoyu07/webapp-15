/**
 * Ember route for memberships (admin).
 */
import Ember from 'ember';
import config from '../../config/environment';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model: function () {
        // Do not specify a user id to retrieve all memberships (works only if user is an admin)
        return this.store.filter('membership', { offset: 0, expireSoon: true }, function (membership) {
            return !membership.get('isExpired') && !membership.get('isStillValidInAMonth');
        });
    },

    actions: {
        sendReminder: function(membership) {

            // Prepare URL
            var url = [ config.apiHost, config.apiNamespace, 'memberships', membership.get('id'), 'send-reminder' ].join('/');

            // Send reminder
            var post = Ember.$.ajax({
                type: 'POST',
                url: url
            });

            // Handle success
            post.done(function (data) {
                // Update reminder sent date so the button get greyed out
                membership.set('reminderSentAt', data.membership.reminderSentAt);

                // Notify user
                alertify.success(Ember.I18n.t('notify.reminderSent', { email: membership.get('user.email') }));
            });

            // Handle failure
            post.fail(function () {
                alertify.error(Ember.I18n.t('notify.submissionError'));
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
            this.store.find('membership', { offset: newOffset, expireSoon: true }).then(function (memberships) {
                self.controller.get('model').addObjects(memberships);
                self.controller.set('isLoading', false);
            });
        }
    }
});
