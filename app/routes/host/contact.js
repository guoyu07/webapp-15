import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import request from 'ic-ajax';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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

        this.controller.set('didValidate', true);
        if (validations.get('isValid')) {

          // Set controller in sending state
          this.controller.set('isSending', true);

          // Prepare URL
          const adapter = this.store.adapterFor('application');
          const url = [adapter.get('host'), adapter.get('namespace'), 'hosts', host.id, 'contact'].join('/');

          // Send email
          const promise = request({
            type: 'POST',
            url,
            data: {
              message
            }
          });

          promise.then(()=> {
            // Reset form
            this.controller.set('message', null);

            // Notify user
            this.controller.toggleProperty('showMessageSentModal');
          });

          promise.finally(()=> {
            this.controller.set('isSending', false);
            this.controller.set('didValidate', false);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    }
  }
});
