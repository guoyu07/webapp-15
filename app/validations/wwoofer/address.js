import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  'address.address1': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      max: 255
    })
  ],
  'address.address2': validator('length', {
    allowBlank: true,
    max: 255
  }),
  'address.zipCode': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      max: 10
    })
  ],
  'address.city': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
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
  'address.department.id': validator('presence', {
    presence: true,
    disabled() {
      return this.get('model.address.country.code') !== 'FR';
    }
  })
});
