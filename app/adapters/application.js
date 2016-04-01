import DS from 'ember-data';
import config from 'webapp/config/environment';

export default DS.RESTAdapter.extend({
  namespace: config.apiNamespace,
  host: config.apiHost
});
