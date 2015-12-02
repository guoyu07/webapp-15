import Ember from 'ember';
import request from 'ic-ajax';

const { service } = Ember.inject;
const PATH = 'api/translations';

export default Ember.Service.extend({

  i18n: service('i18n'),
  moment: service('moment'),

  fetch() {
    return request(PATH).then(this._addTranslations.bind(this));
  },

  _addTranslations(translations) {
    const i18n = this.get('i18n');

    // Get the locale cookie set during the call the the translation endpoint
    var locale = Ember.$.cookie('locale') || window.navigator.userLanguage || window.navigator.language;

    // Set translations for current locale
    i18n.addTranslations(locale, translations);

    // Set moment locale
    this.get('moment').changeLocale(locale);

    // Set ember-i18n locale
    i18n.set('locale', locale);
  }
});
