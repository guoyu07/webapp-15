import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend(ValidationsMixin, {

  translationsFetcher: service('translations-fetcher'),

  /**
   * Indicates whether the user's first/last name can be edited.
   */
  canEditName: computed.readOnly('sessionUser.user.isAdmin'),

  /**
   * Indicates whether the user's birth date can be edited.
   * Legacy users do not have a birth date so give them a chance to set one when editing their info.
   */
  canEditBirthDate: computed.or('sessionUser.user.isAdmin', 'noBirthDate'),

  selectedDate: null,

  actions: {
    saveUser() {

      // Get the user
      let user = this.get('model');

      // Set birth date
      if (this.get('canEditBirthDate')) {
        user.set('birthDate', this.get('selectedDate').format('YYYY-MM-DD'));
      }

      // Initialize validations array
      const validations = [this.validate(), user.validate()];

      // Save the user
      Ember.RSVP.all(validations).then(()=> {
        user.save().then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));

          // Fetch translations from server if the user locale was updated
          if (this.get('i18n.locale') !== user.get('locale')) {
            this.get('translationsFetcher').fetch();
          }
        });
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
      });
    },

    dateSelected(date) {
      this.set('selectedDate', date);
    }
  },

  validations: {
    selectedDate: {
      'is-18': true
    }
  }
});
