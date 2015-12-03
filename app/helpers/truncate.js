import Ember from 'ember';

export function truncate(params, hash) {
  var text = params[0];
  var limit = hash.limit || 30;
  if (text && text.length > limit) {
    text = text.substr(0, limit - 3) + "...";
  }
  return text;
}

export default Ember.Helper.helper(truncate);
