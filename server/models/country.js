module.exports = function (sequelize, DataTypes) {
    var Country = sequelize.define('Country', {
        code: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        tableName: 'countries',
        classMethods: {
            associate: function (models) {
                Country.hasMany(models.Address)
            }
        }
    })
    return Country
}