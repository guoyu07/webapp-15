/**
 * Created by guillaumez on 3/9/14.
 */

module.exports = function (sequelize, DataTypes) {
    var Wwoofer = sequelize.define('Wwoofer', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        birthDate: DataTypes.DATE,
        firstName2: DataTypes.STRING,
        lastName2: DataTypes.STRING,
        birthDate2: DataTypes.DATE,

        city: DataTypes.STRING,
        postalCode: DataTypes.STRING,
        country: DataTypes.STRING
    }, {
        tableName: 'wwoofer'
    })

    return Wwoofer
}