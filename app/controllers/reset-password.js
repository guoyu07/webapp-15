import Ember from 'ember';
import Validations from 'webapp/validations/reset-password';

const { service } = Ember.inject;

export default Ember.Controller.extend(Validations, {

  ajax: service('ajax'),

  email: null,
  isLoading: false,

  actions: {
    /**
     * Resets a user's password then sends the new password to its email address.
     */
    resetPassword() {

      // Validate the form
      this.validate().then(({ m, validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Set controller in loading state
          this.set('isLoading', true);

          // Prepare URL
          const adapter = this.store.adapterFor('application');
          const url = [adapter.get('host'), adapter.get('namespace'), 'users/reset-password'].join('/');

          // Send email
          const promise = this.get('ajax').post(url, {
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
              email: this.get('email')
            })
          });

          promise.then(()=> {
            this.transitionToRoute('login', { queryParams: { fromReset: true } });
          });

          promise.catch((err)=> {
            let status = Number(Ember.get(err, 'errors.firstObject.status'));
            if (status === 404) {
              this.get('notify').error(this.get('i18n').t('notify.userNotFound'));
            }
          });

          promise.finally(()=> {
            this.set('isLoading', false);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    }
  }
});
