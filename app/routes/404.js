import Ember from 'ember';

export default Ember.Route.extend({
  titleToken() {
    return this.get('i18n').t('titles.404');
  },

  headTags: [
    {
      type: 'meta',
      tagId: 'meta-prerender-status-code',
      attrs: {
        name: 'prerender-status-code',
        content: '404'
      }
    }
  ]
});
