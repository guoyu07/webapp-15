module.exports = function (sequelize, DataTypes) {
    var Token = sequelize.define('Token', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false},
        token: DataTypes.STRING,
        expireAt: DataTypes.DATE
    }, {
        tableName: 'tokens'
    })
    return Token
}