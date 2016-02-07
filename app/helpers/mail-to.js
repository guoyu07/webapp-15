import Ember from 'ember';

export function mailTo(params) {
  let [emailAddress] = params;
  let label = params[1] || emailAddress;
  if (!emailAddress) {
    return;
  }

  emailAddress = Ember.Handlebars.Utils.escapeExpression(emailAddress);
  label = Ember.Handlebars.Utils.escapeExpression(label);

  const link = `<a href="mailto:${emailAddress}" title="${emailAddress}">${label}</a>`;
  return new Ember.Handlebars.SafeString(link);
}

export default Ember.Helper.helper(mailTo);
