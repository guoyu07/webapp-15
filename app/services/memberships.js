import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({

  i18n: service('i18n'),

  membershipOptions: computed('i18n.locale', function() {
    return [
      { id: 'WO1', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WO1', { price: '25' }), price: 25 },
      { id: 'WO2', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WO2', { price: '30' }), price: 30 },
      { id: 'H', type: 'H', name: this.get('i18n').t('memberships.itemCodes.H', { price: '35' }), price: 35 },
      { id: 'HR', type: 'H', name: this.get('i18n').t('memberships.itemCodes.HR', { price: '30' }), price: 30 }
    ];
  }),

  shippingRegionOptions: computed('i18n.locale', function() {
    return [
      { id: 'FR', name: this.get('i18n').t('memberships.shipping.FR', { price: '5' }), price: 5 },
      { id: 'WD', name: this.get('i18n').t('memberships.shipping.WD', { price: '10' }), price: 10 }
    ];
  }),

  paymentTypeOptions: computed('i18n.locale', function() {
    return [
      { id: 'CHQ', name: this.get('i18n').t('memberships.paymentTypes.CHQ') },
      { id: 'ESP', name: this.get('i18n').t('memberships.paymentTypes.ESP') },
      { id: 'VIRT', name: this.get('i18n').t('memberships.paymentTypes.VIRT') },
      { id: 'PPL', name: this.get('i18n').t('memberships.paymentTypes.PPL') },
      { id: 'CARD', name: this.get('i18n').t('memberships.paymentTypes.CARD') }
    ];
  })
});
