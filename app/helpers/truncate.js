import Ember from 'ember';

export function truncate(params, hash) {
  const [text] = params;
  const limit = hash.limit || 30;

  let truncatedText = text;
  if (text && text.length > limit) {
    truncatedText = text.substr(0, limit - 3);
    truncatedText += '...';
  }

  return truncatedText;
}

export default Ember.Helper.helper(truncate);
