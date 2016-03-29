import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {
  /**
   * Birth date of the second wwoofer.
   */
  selectedDate: null,

  /**
   * Indicates whether a second wwoofer was specified.
   */
  secondWwooferChecked: false,

  actions: {
    saveWwoofer() {

      // Get wwoofer and address
      let wwoofer = this.get('model');

      // Handle second wwoofer
      if (this.get('secondWwooferChecked')) {
        if (this.get('sessionUser.user.isAdmin')) {
          // Set second wwoofer birth date
          wwoofer.set('birthDate2', this.get('selectedDate').format('YYYY-MM-DD'));
        }
      } else {
        // Erase the other wwoofer info
        wwoofer.set('firstName2', null);
        wwoofer.set('lastName2', null);
        wwoofer.set('birthDate2', null);
      }

      // Initialize validations array
      const validations = [this.validate(), wwoofer.validate()];

      // Validate wwoofer and address
      Ember.RSVP.all(validations).then(()=> {

        // Update wwoofer and address
        wwoofer.save().then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));
          window.scrollTo(0, 0);
        });
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        window.scrollTo(0, 0);
      });
    },

    dateSelected(date) {
      this.set('selectedDate', date);
    }
  },

  validations: {
    'model.firstName2': {
      presence: {
        'if': 'secondWwooferChecked'
      },
      length: { maximum: 255 }
    },
    'model.lastName2': {
      presence: {
        'if': 'secondWwooferChecked'
      },
      length: { maximum: 255 }
    },
    selectedDate: {
      'is-18': {
        'if': 'secondWwooferChecked'
      }
    }
  }
});
