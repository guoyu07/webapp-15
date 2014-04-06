module.exports = function (sequelize, DataTypes) {
    var Renewal = sequelize.define('Renewal', {
        type: DataTypes.ENUM('Host', 'Wwoofer'),
        date: DataTypes.DATE
    }, {
        tableName: 'renewals',
        classMethods: {
            associate: function (models) {
                Renewal.belongsTo(models.User)
            }
        }
    })
    return Renewal
}