/**
 * Ember controller for password update.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';
import request from 'ic-ajax';

export default Ember.Controller.extend(ValidationsMixin, {

  password: null,
  passwordConfirmation: null,
  isLoading: false,

  actions: {
    /**
     * Updates a user's password.
     */
    changePassword() {

      if (this.get('isLoading')) {
        return;
      }

      // Validate form
      this.validate().then(()=> {

        // Get the current user id
        var currentUserId = this.get('sessionUser.user.id');
        Ember.assert('User id cannot be null', currentUserId);

        // Set controller in loading state
        this.set('isLoading', true);

        // Prepare URL
        var adapter = this.store.adapterFor('application'),
          url = [adapter.get('host'), adapter.get('namespace'), 'users', currentUserId, 'change-password'].join('/');

        // Update password
        var promise = request({
          type: 'POST',
          url: url,
          data: {
            newPassword: this.get('password')
          }
        });

        promise.then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));
          this.transitionToRoute('user.edit', currentUserId);
        });

        promise.catch((err)=> {
          err = err.jqXHR || err;
          throw err;
        });

        promise.finally(()=> {
          this.set('isLoading', false);
        });
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
      });
    }
  },

  validations: {
    password: {
      presence: true,
      length: { minimum: 8, maximum: 25 },
      confirmation: true
    },
    passwordConfirmation: {
      presence: true,
      length: { minimum: 8, maximum: 25 }
    }
  }
});
