import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import moment from 'moment';

export default buildValidations({
  'wwoofer.intro': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      min: 100,
      max: 2000
    })
  ],
  'wwoofer.tripMotivation': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      min: 100,
      max: 2000
    })
  ],
  'wwoofer.firstName2': [
    validator('presence', {
      presence: true,
      dependentKeys: ['model.secondWwooferChecked'],
      disabled: Ember.computed(function() {
        return this.get('model.secondWwooferChecked') === false;
      }).volatile(),
    }),
    validator('length', {
      allowBlank: true,
      max: 255
    })
  ],
  'wwoofer.lastName2': [
    validator('presence', {
      presence: true,
      dependentKeys: ['model.secondWwooferChecked'],
      disabled: Ember.computed(function() {
        return this.get('model.secondWwooferChecked') === false;
      }).volatile(),
    }),
    validator('length', {
      allowBlank: true,
      max: 255
    })
  ],
  'wwoofer.birthDate2': validator('date', {
    allowBlank: false,
    before: Ember.computed(function() {
      return moment().subtract(18, 'year');
    }).volatile(),
    format: 'YYYY-MM-DD',
    errorFormat: 'YYYY-MM-DD',
    descriptionKey: 'errors.mustBe18',
    dependentKeys: ['model.secondWwooferChecked'],
    disabled: Ember.computed(function() {
      return this.get('model.secondWwooferChecked') === false;
    }).volatile(),
  }),
  'wwoofer.note': validator('length', {
    allowBlank: true,
    max: 2000
  })
});
