import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  /**
   * Force the async user relationship to load synchronously.
   * See: https://github.com/kimroen/ember-cli-document-title/issues/42
   */
  model(params) {
    return this.get('store').findRecord('wwoofer', params.wwoofer_id).then((wwoofer)=> {
      return this.get('store').findRecord('user', wwoofer.get('user.id')).then(()=> {
        return wwoofer;
      })
    })
  },

  titleToken(model) {
    return model.get('user.fullName');
  }
});
