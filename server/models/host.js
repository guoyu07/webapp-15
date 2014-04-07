module.exports = function (sequelize, DataTypes) {
    var Host = sequelize.define('Host', {
        farmName: DataTypes.STRING
    }, {
        tableName: 'hosts',
        classMethods: {
            associate: function (models) {
                Host.hasMany(models.Photo, { onDelete: 'cascade' })
                Host.belongsTo(models.User)
                Host.belongsTo(models.Address)
            }
        }
    })
    return Host
}