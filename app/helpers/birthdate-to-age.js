/**
 * Ember helper to convert birth date in age.
 */
import Ember from 'ember';
import moment from 'moment';

export function birthDateToAge(params) {
  let date = params[0];
  return date ? moment().diff(moment(date), 'years') : null;
}

export default Ember.Helper.helper(birthDateToAge);
