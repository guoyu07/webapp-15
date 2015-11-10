import Ember from 'ember';

export function mailTo(params) {
    let emailAddress = params[0];
    let label = params[1] || emailAddress;
    if (!emailAddress) { return; }

    emailAddress = Ember.Handlebars.Utils.escapeExpression(emailAddress);
    label = Ember.Handlebars.Utils.escapeExpression(label);

    var link = '<a href="mailto:' + emailAddress + '">' + label + '</a>';
    return new Ember.Handlebars.SafeString(link);
}

export default Ember.Helper.helper(mailTo);
