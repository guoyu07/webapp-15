/**
 * Ember controller for user edition.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {

  /**
   * Indicates whether the user's first name, last name and birth date can be edited.
   */
  canEditUser: Ember.computed.readOnly('sessionUser.user.isAdmin'),

  selectedDate: null,

  actions: {
    saveUser() {

      // Get the user
      var user = this.get('model');

      // Set birth date
      if (this.get('canEditUser')) {
        user.set('birthDate', this.get('selectedDate').format('YYYY-MM-DD'));
      }

      // Initialize validations array
      var validations = [this.validate(), user.validate()];

      // Save the user
      Ember.RSVP.all(validations).then(()=> {
        user.save().then(()=> {
          alertify.success(Ember.I18n.t('notify.informationUpdated'));

          // Refresh the page if the user locale was updated
          if (this.locale !== user.get('locale')) {
            location.reload();
          }
        });
      }).catch(function() {
        alertify.error(Ember.I18n.t('notify.submissionInvalid'));
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
