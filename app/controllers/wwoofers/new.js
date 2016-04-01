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

      // Get the wwoofer
      let wwoofer = this.get('model');

      // Prepare validation promises
      const validations = [this.validate(), wwoofer.validate()];

      // Validate all models
      Ember.RSVP.all(validations).then(()=> {

        // Create the wwoofer
        const promise = wwoofer.save();

        // Inform and redirect user to payment page
        promise.then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.wwooferCreated'));
          this.transitionToRoute('wwoofer.address', wwoofer);
        });
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
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
