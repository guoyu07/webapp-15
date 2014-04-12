module.exports = function (sequelize, DataTypes) {
    var Department = sequelize.define('Department', {
        name: DataTypes.STRING,
        region: DataTypes.STRING
    }, {
        tableName: 'departments',
        classMethods: {
            associate: function (models) {
                Department.hasMany(models.Address)
            }
        }
    })
    return Department
}