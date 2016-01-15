import Ember from 'ember';

export default Ember.Route.extend({
  titleToken() {
    return this.get('i18n').t('titles.404');
  }
});
