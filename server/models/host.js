/**
 * Created by BitTitanGuillaumeZ on 2/17/14.
 */

module.exports = function (sequelize, DataTypes) {

    var Host = sequelize.define('Host', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        farmName: DataTypes.STRING
    }, {
        tableName: 'frenchhost2',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                Host.hasMany(models.Photo, { foreignKey: 'whid', as: 'photos' })
            }
        }
    })

    return Host
}