/**
 * Created by guillaumez on 3/17/14.
 */

module.exports = function(sequelize, DataTypes) {
    var Country = sequelize.define('Country', {
        name: DataTypes.STRING
    });

    return Country
}