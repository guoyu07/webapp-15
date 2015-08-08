/**
 * Ember route for memberships (admin).
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import request from 'ic-ajax';

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

    resetController: function (controller, isExiting) {
        if (isExiting) {
            controller.set('page', 1);
        }
        controller.set('selectedMemberships', Ember.A());
        controller.set('allChecked', false);
    },

    actions: {
        /**
         * Handles click actions within the membership list.
         * Maintains the list of selected memberships.
         * @param membership
         * @param checked
         */
        itemToggled(membership, checked) {
            var selectedMemberships = this.controller.get('selectedMemberships');
            if (checked === true) {
                selectedMemberships.addObject(membership);
            } else {
                selectedMemberships.removeObject(membership);
                if (this.controller.get('allChecked') === true) {
                    this.controller.set('allChecked', false);
                }
            }
        },
        /**
         * Sends a reminder too each "remindable" selected membership.
         */
        sendReminder: function() {

            // Prepare URL
            var adapter = this.store.adapterFor('application');

            // Get memberships for which no reminder was sent already
            var remindableMemberships = this.controller.get('remindableMemberships');

            // Send the reminders
            var promises = remindableMemberships.map(function (membership) {
                var url = [
                    adapter.get('host'),
                    adapter.get('namespace'),
                    'memberships',
                    membership.get('id'),
                    'send-reminder'
                ].join('/');

                // Send reminder
                return request({
                    type: 'POST',
                    url: url
                });
            });

            // Handle success
            var promise = Ember.RSVP.all(promises);

            promise.then( ()=> {

                // Refresh the memberships
                this.refresh();

                // Notify user
                alertify.success(Ember.I18n.t('notify.reminderSent'));
            });
        }
    }
});
