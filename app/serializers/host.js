import Ember from 'ember';
import ApplicationSerializer from 'webapp/serializers/application';

export default ApplicationSerializer.extend({
  serialize(snapshot, options) {
    let json = this._super(snapshot, options);

    json.farmName = Ember.String.capitalize(json.farmName);
    json.shortDescription = Ember.String.capitalize(json.shortDescription);
    json.travelDetails = Ember.String.capitalize(json.travelDetails);

    return json;
  }
});
