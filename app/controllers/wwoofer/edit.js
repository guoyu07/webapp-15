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
  showOtherWwoofer: Ember.computed.or('secondWwooferChecked', 'sessionUser.user.isAdmin'),

  /**
   * Indicates whether the second wwoofer can be edited.
   */
  canEditOtherWwoofer: Ember.computed.or('sessionUser.user.isAdmin'),

  actions: {
    saveWwoofer() {

      // Get wwoofer and address
      let wwoofer = this.get('model');

      // Handle second wwoofer
      if (this.get('secondWwooferChecked')) {
        if (this.get('canEditOtherWwoofer')) {
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
