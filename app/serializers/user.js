import Ember from 'ember';
import ApplicationSerializer from 'webapp/serializers/application';

export default ApplicationSerializer.extend({
  serialize(snapshot, options) {
    let json = this._super(snapshot, options);

    json.firstName = Ember.String.capitalize(json.firstName);
    json.lastName = Ember.String.capitalize(json.lastName);

    return json;
  }
});
