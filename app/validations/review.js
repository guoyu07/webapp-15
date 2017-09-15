import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  'review.text': [
    validator('presence', true),
    validator('length', {
      max: 1000
    })
  ],
  'review.rating': [
    validator('presence', true),
    validator('number', {
      allowString: false,
      integer: true,
      gte: 1,
      lte: 5
    })
  ],
  'review.replyText': [
    validator('length', {
      max: 1000
    })
  ],
});
