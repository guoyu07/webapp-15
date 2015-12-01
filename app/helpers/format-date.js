/**
 * Ember helper to display dates in a human readable format.
 */
import Ember from 'ember';
import moment from 'moment';

export function formatDate(params, hash) {
  let date = params[0];
  if (!date) {
    return;
  }

  var format = hash.format || 'LL';
  var momentDate = moment(date);
  return momentDate.isValid() ? momentDate.format(format) : 'Invalid date';
}

export default Ember.Helper.helper(formatDate);
