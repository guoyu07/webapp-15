import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import request from 'ic-ajax';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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

      var controller = this.get('controller');
      var message = controller.get('message');
      var host = controller.get('model');

      // Validate the form
      controller.validate().then(()=> {

        // Set controller in sending state
        controller.set('isSending', true);

        // Prepare URL
        var adapter = this.store.adapterFor('application'),
          url = [adapter.get('host'), adapter.get('namespace'), 'hosts', host.id, 'contact'].join('/');

        // Send email
        var promise = request({
          type: 'POST',
          url: url,
          data: {
            message: message
          }
        });

        promise.then(()=> {
          // Reset form
          controller.set('message', null);
          controller.resetValidations();

          // Notify user
          controller.toggleProperty('showMessageSentModal');
        });

        promise.finally(()=> {
          controller.set('isSending', false);
        });
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
      });
    }
  }
});
