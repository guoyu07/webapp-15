import Ember from 'ember';

export function convertBreakLines(params) {
  let [text] = params;
  text = Ember.Handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return Ember.String.htmlSafe(text);
}

export default Ember.Helper.helper(convertBreakLines);
