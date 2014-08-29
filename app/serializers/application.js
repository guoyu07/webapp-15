/**
 * Custom global REST Serializer.
 */
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    /**
     * Overridden method. Defines a custom key when serializing relationship properties.
     * Sequelize returns foreign keys with 'Id' at the end (ex: user => userId).
     */
    keyForRelationship: function (key, relationship) {
        if (relationship === 'belongsTo') {
            key = key + 'Id';
        }
        if (relationship === 'hasMany') {
            key = key.singularize() + 'Ids';
        }
        return key;
    }
});