/**
 * Ember route for memberships (admin).
 */
import Ember from 'ember';
import config from '../../config/environment';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    queryParams: {
        page: {
            refreshModel: true
        }
    },

    model: function (params) {

        var page = params.page || 1;
        var limit = params.itemsPerPage || 20;
        var offset = (page - 1) * limit;

        return this.store.find('membership', {
            offset: offset,
            limit: limit,
            expireSoon: true
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
        }
    }
});
