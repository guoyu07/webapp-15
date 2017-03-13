import Ember from 'ember';
import DS from 'ember-data';
import Validations from 'webapp/validations/photo';

const { computed } = Ember;

export default DS.Model.extend(Validations, {
  fileName: DS.attr('string'),
  caption: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relationships
  host: DS.belongsTo('host', { async: false }),

  /**
   * Returns the complete URL of the photo.
   */
  completeUrl: computed('fileName', function() {
    const fileName = this.get('fileName');
    if (!Ember.isEmpty(fileName)) {
      const encodedFileName = encodeURIComponent(fileName);
      return `https://s3.amazonaws.com/wwoof-france/photos/hosts/${encodedFileName}`;
    }
  }),

  isThumbnail: computed('host.thumbnail.id', 'id', function () {
    return this.get('host.thumbnail.id') === this.get('id');
  }),

  /**
   * Returns true if the photo is in a state where it cannot be saved.
   */
  cannotSave: computed('isSaving', 'hasDirtyAttributes', function() {
    return this.get('isSaving') || !this.get('hasDirtyAttributes');
  })
});
