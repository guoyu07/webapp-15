import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  
  ajax: service('ajax'),

  titleToken() {
    return this.get('i18n').t('titles.host.contact');
  },

  /**
   * Redirects users with no woofer profile to the create page.
   * Redirects users with no active memberships to the purchase page.
   */
  redirect() {
    this.get('sessionUser.user').then((user)=> {
      if (!user.get('wwoofer.id')) {
        this.transitionTo('wwoofers.new');
      } else if (!user.get('hasNonExpiredMembership')) {
        this.transitionTo('memberships.new', {
          queryParams: { type: 'W', itemCode: 'WO1' }
        });
      }
    });
  },

  renderTemplate() {
    this.render({ into: 'application' });
  },

  actions: {
    /**
     * Sends a message to a host.
     */
    sendMessage() {
      const message = this.controller.get('message');
      const host = this.controller.get('model');

      // Validate the form
      this.controller.validate().then(({ m, validations })=> {

        this.set('controller.didValidate', true);
        if (validations.get('isValid')) {

          // Set controller in sending state
          this.controller.set('isSending', true);

          // Prepare URL
          const adapter = this.store.adapterFor('application');
          const url = [adapter.get('host'), adapter.get('namespace'), 'hosts', host.id, 'contact'].join('/');

          // Send email
          const promise = this.get('ajax').request({
            method: 'POST',
            url,
            data: {
              message
            }
          });

          promise.then(()=> {
            // Reset form
            this.controller.set('message', null);
            this.controller.resetValidations();

            // Notify user
            this.controller.toggleProperty('showMessageSentModal');
          });

          promise.finally(()=> {
            this.controller.set('isSending', false);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    }
  }
});
