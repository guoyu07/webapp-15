import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  'host.farmName': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      min: 5,
      max: 50
    })
  ],
  'host.shortDescription': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      min: 5,
      max: 255
    })
  ],
  'host.fullDescription': [
    validator('presence', true),
    validator('length', {
      allowBlank: false,
      min: 300,
      max: 5000
    })
  ],
  'host.travelDetails': validator('length', {
    allowBlank: true,
    max: 255
  }),
  'host.activities': validator('presence', {
    presence: true,
    dependentKeys: ['host.activities.[]']
  }),
  'host.stays': validator('presence', {
    presence: true,
    dependentKeys: ['host.stays.[]']
  }),
  'host.lodgings': validator('presence', {
    presence: true,
    dependentKeys: ['host.lodgings.[]']
  }),
  'host.capacity': validator('presence', true),
  'host.note': validator('length', {
    allowBlank: true,
    max: 2000
  })
});
