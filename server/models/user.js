module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        passwordHash: {type: DataTypes.STRING, allowNull: false},
        firstName: {type: DataTypes.STRING, allowNull: false},
        lastName: {type: DataTypes.STRING, allowNull: false},
        birthDate: DataTypes.DATE,
        phone: DataTypes.STRING
    }, {
        tableName: 'users',
        classMethods: {
            associate: function (models) {
                User.hasOne(models.Host, { onDelete: 'cascade' })
                User.hasOne(models.Wwoofer, { onDelete: 'cascade' })
                User.hasMany(models.Renewal)
            }
        }
    })
    return User
}