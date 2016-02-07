import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';
import request from 'ic-ajax';

export default Ember.Controller.extend(ValidationsMixin, {

  emailAddress: null,
  isLoading: false,

  actions: {
    /**
     * Resets a user's password then sends the new password to its email address.
     */
    resetPassword() {

      if (this.get('isLoading')) {
        return;
      }

      this.validate().then(()=> {

        // Set controller in loading state
        this.set('isLoading', true);

        // Prepare URL
        const adapter = this.store.adapterFor('application');
        const url = [adapter.get('host'), adapter.get('namespace'), 'users/reset-password'].join('/');

        // Send email
        const promise = request({
          type: 'POST',
          url,
          data: {
            email: this.get('emailAddress')
          }
        });

        promise.then(()=> {
          this.transitionToRoute('login', { queryParams: { fromReset: true } });
        });

        promise.catch((err)=> {
          err = err.jqXHR || err;
          if (err.status === 404) {
            this.get('notify').error(this.get('i18n').t('notify.userNotFound'));
          } else {
            throw err;
          }
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
    emailAddress: {
      presence: true,
      format: {
        with: Regex.EMAIL_ADDRESS
      }
    }
  }
});
