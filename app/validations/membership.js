import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import moment from 'moment';

export default buildValidations({
  'membership.itemCode': [
    validator('presence', true)
  ],
  'shippingRegion': [
    validator('presence', {
      presence: true,
      dependentKeys: ['model.membership.hasBooklet'],
      disabled: Ember.computed(function() {
        return this.get('model.membership.hasBooklet') === false;
      }).volatile()
    })
  ],
  'membership.paymentType': [
    validator('presence', {
      presence: true,
      dependentKeys: ['model.isAdminMode', 'model.isFree'],
      disabled: Ember.computed(function() {
        return this.get('model.isAdminMode') === false || this.get('model.isFree') === true;
      }).volatile()
    })
  ],
  'membership.total': [
    validator('presence', true),
    validator('number', {
      allowString: false,
      gte: 0
    })
  ],
  'membership.firstName2': [
    validator('presence', {
      presence: true,
      dependentKeys: ['model.membership.isDuo'],
      disabled: Ember.computed(function() {
        return this.get('model.membership.isDuo') === false;
      }).volatile(),
    }),
    validator('length', {
      allowBlank: true,
      max: 255
    })
  ],
  'membership.lastName2': [
    validator('presence', {
      presence: true,
      dependentKeys: ['model.membership.isDuo'],
      disabled: Ember.computed(function() {
        return this.get('model.membership.isDuo') === false;
      }).volatile(),
    }),
    validator('length', {
      allowBlank: true,
      max: 255
    })
  ],
  'membership.birthDate2': validator('date', {
    allowBlank: false,
    before: Ember.computed(function() {
      return moment().subtract(18, 'year');
    }).volatile(),
    format: 'YYYY-MM-DD',
    errorFormat: 'YYYY-MM-DD',
    descriptionKey: 'errors.mustBe18',
    dependentKeys: ['model.membership.isDuo'],
    disabled: Ember.computed(function() {
      return this.get('model.membership.isDuo') === false;
    }).volatile()
  })
});
