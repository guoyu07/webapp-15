import Ember from 'ember';
import Validations from 'webapp/validations/membership';

const { computed } = Ember;

export default Ember.Controller.extend(Validations, {

  membership: null,
  paymentType: null,
  selectedDate: null,

  isAdminMode: computed.readOnly('sessionUser.user.isAdmin'),

  actions: {
    saveMembership(membership) {

      // Parse total into number
      membership.set('total', parseFloat(membership.get('total')));

      this.validate().then(({ validations })=> {

        this.set('validations.didValidate', true);
        if (validations.get('isValid')) {

          membership.save().then(() => {
            this.transitionToRoute('memberships.index');
          });
        } else {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        }
      });
    },

    paymentTypeDidChange(paymentType) {
      const paymentTypeId = paymentType ? paymentType.id : null;
      this.set('paymentType', paymentType);
      this.set('membership.paymentType', paymentTypeId);
    },

    itemCodeChanged(membershipOption) {
      this.set('membership.itemCode', membershipOption);

      if (this.get('membership.isDuo') === false) {
        this.set('membership.firstName2', null);
        this.set('membership.lastName2', null);
        this.set('membership.birthDate2', null);
        this.set('selectedDate', null);
      }
    },

    dateSelected(date) {
      this.set('membership.birthDate2', date.format('YYYY-MM-DD'));
    }
  }
});
