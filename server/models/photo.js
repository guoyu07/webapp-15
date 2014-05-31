/**
 * Sequelize model for Photos.
 * @param sequelize The Sequelize instance.
 * @param DataTypes The data types.
 * @returns {Object} The Sequelize model.
 */
module.exports = function (sequelize, DataTypes) {
    var Photo = sequelize.define('Photo', {
        fileName: DataTypes.STRING,
        caption: DataTypes.STRING
    }, {
        tableName: 'photos',
        classMethods: {
            associate: function (models) {
                Photo.belongsTo(models.Host, { onDelete: 'cascade' })
            }
        }
    });
    return Photo
};