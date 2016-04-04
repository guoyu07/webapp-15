import Ember from 'ember';
import Validations from 'webapp/validations/login';

export default Ember.Controller.extend(Validations, {

  queryParams: ['fromReset'],

  fromReset: null,
  username: null,
  password: null,
  isLoading: false,
  didValidate: false,

  actions: {
    /**
     * Logs a user in.
     */
    login() {

      // Validate form then login
      this.validate().then(() => {
        this.set('didValidate', true);

        if (this.get('validations').get('isValid')) {

          // Set controller in loading state
          this.set('isLoading', true);

          // Authenticate user
          const auth = this.get('session').authenticate('authenticator:passport', {
            username: this.get('username'),
            password: this.get('password')
          });

          // Handle failure
          auth.catch(()=> {
            this.get('notify').error(this.get('i18n').t('notify.userCannotAuthenticate'));
          });

          auth.finally(() => {
            this.set('isLoading', false);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    }
  }
});
