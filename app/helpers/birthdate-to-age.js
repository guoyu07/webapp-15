import Ember from 'ember';
import moment from 'moment';

export function birthDateToAge(params) {
  const [date] = params;
  return date ? moment().diff(moment(date), 'years') : null;
}

export default Ember.Helper.helper(birthDateToAge);
