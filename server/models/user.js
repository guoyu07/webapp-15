/**
 * Created by guillaumez on 3/22/14.
 */

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        passwordHash: DataTypes.STRING
    }, {
        tableName: 'users',
        timestamps: false
    })

    return User
}