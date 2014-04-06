/**
 * Created by BitTitanGuillaumeZ on 2/17/14.
 */

module.exports = function (sequelize, DataTypes) {
    var Host = sequelize.define('Host', {
        id: { type: DataTypes.INTEGER, primaryKey: true},
        farmName: DataTypes.STRING
    }, {
        tableName: 'hosts',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                Host.hasMany(models.Photo, { onDelete: 'cascade' })
            }
        }
    })
    return Host
}