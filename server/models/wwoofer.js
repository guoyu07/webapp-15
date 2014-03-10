/**
 * Created by guillaumez on 3/9/14.
 */

module.exports = function(sequelize, DataTypes) {
    var Wwoofer = sequelize.define('Wwoofer', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        city: DataTypes.STRING,
        postalCode: DataTypes.STRING
    }, {
        tableName: 'wwoofer',
        timestamps: false
    })

    return Wwoofer
}