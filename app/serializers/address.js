import Ember from 'ember';
import ApplicationSerializer from 'webapp/serializers/application';

export default ApplicationSerializer.extend({
  serialize(snapshot, options) {
    let json = this._super(snapshot, options);

    json.address1 = Ember.String.capitalize(json.address1);
    json.city = Ember.String.capitalize(json.city);

    return json;
  }
});
