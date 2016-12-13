import Ember from 'ember';

const { service } = Ember.inject;
const { computed } = Ember;

export default Ember.Component.extend({

  classNameBindings: ['hasArticles:panel', 'hasArticles:panel-default'],

  ajax: service('ajax'),
  i18n: service('i18n'),

  articles: computed('label', 'i18n.locale', function() {
    let label = this.get('label');
    if (!label) {
      return;
    }

    let locale = this.get('i18n.locale');
    let zendeskLocale = locale === 'en' ? 'en-us' : 'fr';

    let url = `https://wwoof-france.zendesk.com/api/v2/help_center/${zendeskLocale}/articles.json?label_names=${label}`;

    let promise = this.get('ajax').request(url, { cache: true });
    let ObjectPromiseProxy = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);

    return ObjectPromiseProxy.create({ promise });
  }),

  hasArticles: computed.notEmpty('articles.articles')
});
