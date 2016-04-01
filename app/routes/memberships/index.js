import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import request from 'ic-ajax';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('i18n').t('titles.memberships.index');
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    expireSoon: {
      refreshModel: true
    },
    userId: {
      refreshModel: true
    },
    includeBooklet: {
      refreshModel: true
    }
  },

  model(params) {

    let limit = params.itemsPerPage || 20;
    let queryParams = {
      offset: (params.page - 1) * limit,
      limit
    };
    if (params.expireSoon === true) {
      queryParams.expireSoon = true;
    }
    if (params.userId) {
      queryParams.userId = params.userId;
    }
    if (params.includeBooklet === true) {
      queryParams.includeBooklet = true;
    }

    // Prepare promises
    let promises = {
      memberships: this.store.query('membership', queryParams)
    };
    if (params.userId) {
      promises.user = this.store.findRecord('user', params.userId);
    }

    return Ember.RSVP.hash(promises);
  },

  setupController(controller, result) {
    controller.setProperties(result);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
    }
    controller.setProperties({
      expireSoon: false,
      includeBooklet: false,
      allChecked: false,
      userId: null,
      selectedMemberships: Ember.A()
    });
  },

  actions: {
    /**
     * Handles click actions within the membership list.
     * Maintains the list of selected memberships.
     * @param membership
     * @param checked
     */
    itemToggled(membership, checked) {
      let selectedMemberships = this.controller.get('selectedMemberships');
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
     * Clears all filters.
     */
    clearFilters() {
      this.resetController(this.controller, false);
    },

    /**
     * Sends a reminder too each "remindable" selected membership.
     */
    sendReminder() {
      const adapter = this.store.adapterFor('application');

      // Get memberships for which no reminder was sent already
      const remindableMemberships = this.controller.get('remindableMemberships');

      // Send the reminders
      let promises = remindableMemberships.map(function(membership) {
        const id = membership.get('id');
        const url = [adapter.get('host'), adapter.get('namespace'), 'memberships', id, 'send-reminder'].join('/');

        // Send reminder
        return request({
          type: 'POST',
          url
        });
      });

      // Handle success
      const promise = Ember.RSVP.all(promises);

      // Notify user
      promise.then(()=> {
        this.get('notify').success(this.get('i18n').t('notify.reminderSent'));
      });

      // Refresh the memberships
      promise.finally(()=> {
        this.refresh();
      });
    }
  }
});
