import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import moment from 'moment';

export default buildValidations({
  'user.email': validator('format', {
    allowBlank: false,
    type: 'email'
  }),
  'user.firstName': [
    validator('presence', true),
    validator('length', {
      max: 255
    })
  ],
  'user.lastName': [
    validator('presence', true),
    validator('length', {
      max: 255
    })
  ],
  'user.birthDate': validator('date', {
    allowBlank: false,
    before: Ember.computed(function() {
      return moment().subtract(18, 'year');
    }).volatile(),
    format: 'YYYY-MM-DD',
    errorFormat: 'YYYY-MM-DD',
    descriptionKey: 'errors.mustBe18'
  })
});
