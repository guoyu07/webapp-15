import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import moment from 'moment';

export default buildValidations({
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
