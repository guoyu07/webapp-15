module.exports = function (sequelize, DataTypes) {
    var Wwoofer = sequelize.define('Wwoofer', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        birthDate: DataTypes.DATE,
        firstName2: DataTypes.STRING,
        lastName2: DataTypes.STRING,
        birthDate2: DataTypes.DATE
    }, {
        tableName: 'wwoofer',
        classMethods: {
            associate: function (models) {
                Wwoofer.belongsTo(models.User)
                Wwoofer.belongsTo(models.Address)
            }
        }
    })
    return Wwoofer
}