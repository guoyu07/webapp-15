/**
 * Created by guillaumez on 3/29/2014.
 */

module.exports = function (sequelize, DataTypes) {
    var Token = sequelize.define('Token', {
        token: DataTypes.STRING,
        expireAt: DataTypes.DATE
    }, {
        tableName: 'tokens'
    })

    return Token
}