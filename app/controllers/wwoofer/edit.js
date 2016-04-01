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
      this.set('model.birthDate2', date.format('YYYY-MM-DD'));
    },

    toggleSecondWwoofer(secondWwooferChecked) {
      if (secondWwooferChecked === false) {
        const wwoofer = this.get('model');
        wwoofer.setProperties({
          'firstName2': null,
          'lastName2': null,
          'birthDate2': null
        });
        this.set('selectedDate', null);
      }

      this.set('secondWwooferChecked', secondWwooferChecked);
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
    'model.birthDate2': {
      presence: {
        'if': 'secondWwooferChecked'
      },
      'is-18': {
        'if': 'secondWwooferChecked'
      }
    }
  }
});
