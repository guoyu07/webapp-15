import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  /**
   * Overridden method. Defines a custom key when serializing relationship properties.
   * Sequelize returns foreign keys with 'Id' at the end (ex: user => userId).
   */
  keyForRelationship(key, relationship) {
    if (relationship === 'belongsTo') {
      key += 'Id';
    }
    if (relationship === 'hasMany') {
      const singularizedKey = key.singularize();
      key = `${singularizedKey}Ids`;
    }
    return key;
  }
});
