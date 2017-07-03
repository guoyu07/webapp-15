import Ember from 'ember';
import DS from 'ember-data';
import config from 'webapp/config/environment';
import Validations from 'webapp/validations/photo';

const { computed } = Ember;

export default DS.Model.extend(Validations, {
  fileName: DS.attr('string'),
  caption: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relationships
  host: DS.belongsTo('host', { async: false }),

  getImageUrl(size) {
    let fileName = this.get('fileName') || 'default.png';
    return `${config.thumbor.baseUrl}/${size}/photos/hosts/${fileName}`;
  },

  urlLarge: computed('filename', function () {
    return this.getImageUrl('815x458');
  }),

  urlMedium: computed('filename', function () {
    return this.getImageUrl('380x253');
  }),

  urlThumb2: computed('filename', function () {
    return this.getImageUrl('250x250');
  }),

  urlThumb1: computed('filename', function () {
    return this.getImageUrl('100x100');
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
