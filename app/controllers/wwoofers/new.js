import Ember from 'ember';
import Validations from 'webapp/validations/wwoofer';

export default Ember.Controller.extend(Validations, {
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
      let wwoofer = this.get('wwoofer');

      // Validate the form
      this.validate().then(({ m, validations })=> {

        this.set('didValidate', true);
        if (validations.get('isValid')) {

          // Create the wwoofer and redirect user to payment page
          wwoofer.save().then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.wwooferCreated'));
            this.transitionToRoute('wwoofer.address', wwoofer);
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    },

    dateSelected(date) {
      this.set('wwoofer.birthDate2', date.format('YYYY-MM-DD'));
    },

    toggleSecondWwoofer(secondWwooferChecked) {
      if (secondWwooferChecked === false) {
        const wwoofer = this.get('wwoofer');
        wwoofer.setProperties({
          'firstName2': null,
          'lastName2': null,
          'birthDate2': null
        });
        this.set('selectedDate', null);
      }

      this.set('secondWwooferChecked', secondWwooferChecked);
    }
  }
});
