import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({

  i18n: service('i18n'),

  membershipOptions: computed('i18n.locale', function() {
    return [
      { id: 'WO1', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WO1', { price: '25' }), price: 25 },
      { id: 'WO2', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WO2', { price: '30' }), price: 30 },
      { id: 'WOB1', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WOB1', { price: '42' }), price: 42 },
      { id: 'WOB2', type: 'W', name: this.get('i18n').t('memberships.itemCodes.WOB2', { price: '47' }), price: 47 },
      { id: 'H', type: 'H', name: this.get('i18n').t('memberships.itemCodes.H', { price: '35' }), price: 35 },
      { id: 'HR', type: 'H', name: this.get('i18n').t('memberships.itemCodes.HR', { price: '30' }), price: 30 }
    ];
  }),

  shippingRegionOptions: computed('i18n.locale', function() {
    return [
      { id: 'FR', name: this.get('i18n').t('memberships.shipping.FR', { price: '5.01' }), price: 5.01 },
      { id: 'OM1', name: this.get('i18n').t('memberships.shipping.OM1', { price: '8.91' }), price: 8.91 },
      { id: 'OM2', name: this.get('i18n').t('memberships.shipping.OM2', { price: '13.59' }), price: 13.59 },
      { id: 'EU', name: this.get('i18n').t('memberships.shipping.EU', { price: '9.91' }), price: 9.91 },
      { id: 'WD', name: this.get('i18n').t('memberships.shipping.WD', { price: '12.15' }), price: 12.15 }
    ];
  }),

  paymentTypeOptions: computed('i18n.locale', function() {
    return [
      { id: 'CHQ', name: this.get('i18n').t('memberships.paymentTypes.CHQ') },
      { id: 'ESP', name: this.get('i18n').t('memberships.paymentTypes.ESP') },
      { id: 'VIRT', name: this.get('i18n').t('memberships.paymentTypes.VIRT') },
      { id: 'PPL', name: this.get('i18n').t('memberships.paymentTypes.PPL') }
    ];
  })
});
