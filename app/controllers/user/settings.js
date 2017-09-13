import Ember from 'ember';
import Validations from 'webapp/validations/user/settings';

const { service } = Ember.inject;

export default Ember.Controller.extend(Validations, {

  translationsFetcher: service('translations-fetcher'),

  actions: {
    saveUser() {

      // Get the user
      let user = this.get('user');

      // Validate the form
      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          // Save the user
          user.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));

            // Fetch translations from server if the user locale was updated
            if (this.get('i18n.locale') !== user.get('locale')) {
              this.get('translationsFetcher').fetch();
            }

            // Refresh the session across all tabs
            this.get('sessionUser').refresh();
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
          window.scrollTo(0, 0);
        }
      });
    }
  }
});
