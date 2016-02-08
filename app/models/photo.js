import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

const { computed } = Ember;

export default DS.Model.extend(ValidationsMixin, {
  fileName: DS.attr('string'),
  caption: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Relationships
  host: DS.belongsTo('host'),

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

  /**
   * Returns true if the photo is in a state where it cannot be saved.
   */
  cannotSave: computed('isSaving', 'hasDirtyAttributes', function() {
    return this.get('isSaving') || !this.get('hasDirtyAttributes');
  }),

  // Validations
  validations: {
    caption: {
      length: { maximum: 255 }
    }
  }
});
