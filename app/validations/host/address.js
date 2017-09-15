import { validator, buildValidations } from 'ember-cp-validations';
import Regex from 'webapp/utils/regex';

export default buildValidations({
  'address.address1': [
    validator('presence', true),
    validator('length', {
      max: 255
    })
  ],
  'address.address2': validator('length', {
    max: 255
  }),
  'address.zipCode': [
    validator('presence', true),
    validator('length', {
      max: 10
    })
  ],
  'address.city': [
    validator('presence', true),
    validator('length', {
      max: 255
    })
  ],
  'address.latitude': validator('number', {
    allowBlank: true,
    allowString: true,
    integer: false,
    gte: -90,
    lte: 90
  }),
  'address.longitude': validator('number', {
    allowBlank: true,
    allowString: true,
    integer: false,
    gte: -180,
    lte: 180
  }),
  'address.country.id': validator('presence', true),
  'address.department.id': validator('presence', true),
  'user.phone': [
    validator('presence', true),
    validator('length', {
      max: 50
    })
  ],
  'host.webSite': validator('format', {
    allowBlank: true,
    regex: Regex.URL
  })
});
