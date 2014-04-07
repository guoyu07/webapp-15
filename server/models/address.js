module.exports = function (sequelize, DataTypes) {
    var Address = sequelize.define('Address', {
        address1: DataTypes.STRING,
        address2: DataTypes.STRING,
        zipCode: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING
    }, {
        tableName: 'addresses',
        classMethods: {
            associate: function (models) {
                Address.belongsTo(models.Department, { foreignKeyConstraint: true })
                Address.belongsTo(models.Country, { foreignKeyConstraint: true })
                Address.hasOne(models.Wwoofer, { onDelete: 'cascade' })
                Address.hasOne(models.Host, { onDelete: 'cascade' })
            }
        }
    })
    return Address
}