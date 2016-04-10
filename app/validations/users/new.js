import { validator, buildValidations } from 'ember-cp-validations';
import moment from 'moment';

export default buildValidations({
  'user.email': validator('format', {
    allowBlank: false,
    type: 'email'
  }),
  'user.password': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      min: 8,
      max: 25
    })
  ],
  'user.firstName': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      max: 255
    })
  ],
  'user.lastName': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      max: 255
    })
  ],
  'user.birthDate': validator('date', {
    allowBlank: false,
    before() {
      return moment().subtract(18, 'year');
    },
    format: 'YYYY-MM-DD',
    errorFormat: 'YYYY-MM-DD',
    descriptionKey: 'errors.mustBe18'
  })
});
