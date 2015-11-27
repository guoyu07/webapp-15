/**
 * Ember controller for wwoofer creation.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {

  countriesService: Ember.inject.service('countries'),
  departmentsService: Ember.inject.service('departments'),

  selectedDate: null,

  /**
   * Indicates whether a second wwoofer was specified.
   */
  secondWwooferChecked: false,

  /**
   * Indicates whether the fields for the second wwoofer must be shown.
   */
  showOtherWwoofer: Ember.computed.readOnly('secondWwooferChecked'),

  /**
   * Indicates whether the second wwoofer can be edited.
   */
  canEditOtherWwoofer: true,

  actions: {
    saveWwoofer() {

      // Get the wwoofer
      var wwoofer = this.get('model');
      var secondWwooferChecked = this.get('secondWwooferChecked');

      // Handle second wwoofer
      if (secondWwooferChecked) {
        // Set second wwoofer birth date (if any)
        wwoofer.set('birthDate2', this.get('selectedDate').format('YYYY-MM-DD'));
      } else {
        // Erase the other wwoofer info
        wwoofer.set('firstName2', null);
        wwoofer.set('lastName2', null);
        wwoofer.set('birthDate2', null);
      }

      // Prepare validation promises
      var validations = [this.validate(), wwoofer.validate()];

      // Validate all models
      Ember.RSVP.all(validations).then(()=> {

        // Create the wwoofer
        var promise = wwoofer.save();

        // Inform and redirect user to payment page
        promise.then(()=> {
          alertify.success(Ember.I18n.t('notify.wwooferCreated'));
          this.transitionToRoute('wwoofer.address', wwoofer);
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
