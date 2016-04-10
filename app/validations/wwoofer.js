import { validator, buildValidations } from 'ember-cp-validations';

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
      dependentKeys: ['secondWwooferChecked'],
      disabled() {
        return this.get('model.secondWwooferChecked') === false;
      }
    }),
    validator('length', {
      allowBlank: true,
      max: 255
    })
  ],
  'wwoofer.lastName2': [
    validator('presence', {
      presence: true,
      dependentKeys: ['secondWwooferChecked'],
      disabled() {
        return this.get('model.secondWwooferChecked') === false;
      }
    }),
    validator('length', {
      allowBlank: true,
      max: 255
    })
  ],
  'wwoofer.birthDate2': validator('date', {
    allowBlank: false,
    before() {
      return moment().subtract(18, 'year');
    },
    format: 'YYYY-MM-DD',
    errorFormat: 'YYYY-MM-DD',
    descriptionKey: 'errors.mustBe18',
    dependentKeys: ['secondWwooferChecked'],
    disabled() {
      return this.get('model.secondWwooferChecked') === false;
    }
  }),
  'wwoofer.note': validator('length', {
    allowBlank: true,
    max: 2000
  })
});
