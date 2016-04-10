import Ember from 'ember';
import Validations from 'webapp/validations/user/edit';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend(Validations, {

  translationsFetcher: service('translations-fetcher'),

  selectedDate: null,

  noSelectedDate: computed.empty('selectedDate'),

  /**
   * Indicates whether the user's first/last name can be edited.
   */
  canEditName: computed.readOnly('sessionUser.user.isAdmin'),

  /**
   * Indicates whether the user's birth date can be edited.
   * Legacy users do not have a birth date so give them a chance to set one when editing their info.
   */
  canEditBirthDate: computed.or('sessionUser.user.isAdmin', 'noSelectedDate'),

  actions: {
    saveUser() {

      // Get the user
      let user = this.get('user');

      // Validate the form
      this.validate().then(({ m, validations })=> {

        this.set('didValidate', true);
        if (validations.get('isValid')) {

          // Save the user
          user.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));

            // Fetch translations from server if the user locale was updated
            if (this.get('i18n.locale') !== user.get('locale')) {
              this.get('translationsFetcher').fetch();
            }
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
          window.scrollTo(0, 0);
        }
      });
    },

    dateSelected(date) {
      this.set('user.birthDate', date.format('YYYY-MM-DD'));
    }
  }
});
