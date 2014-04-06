/**
 * Created by guillaumez on 2/22/14.
 */

module.exports = function (sequelize, DataTypes) {
    var Photo = sequelize.define('Photo', {
        fileName: DataTypes.STRING,
        caption: DataTypes.STRING
    }, {
        tableName: 'photos',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                Photo.belongsTo(models.Host, { foreignKey: 'whid', as: 'host' })
            }
        }
    })

    return Photo
}