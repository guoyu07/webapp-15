import Ember from 'ember';
import Validations from 'webapp/validations/user/change-password';

const { service } = Ember.inject;

export default Ember.Controller.extend(Validations, {

  ajax: service('ajax'),

  password: null,
  passwordConfirmation: null,
  isLoading: false,

  actions: {
    /**
     * Updates a user's password.
     */
    changePassword() {

      // Validate the form
      this.validate().then(({ m, validations })=> {

        this.set('didValidate', true);
        if (validations.get('isValid')) {

          // Get the current user id
          const currentUserId = this.get('sessionUser.user.id');
          Ember.assert('User id cannot be null', currentUserId);

          // Set controller in loading state
          this.set('isLoading', true);

          // Prepare URL
          const adapter = this.store.adapterFor('application');
          const url = [adapter.get('host'), adapter.get('namespace'), 'users', currentUserId, 'change-password'].join('/');

          // Update password
          const promise = this.get('ajax').request(url, {
            method: 'POST',
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
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    }
  }
});
