/**
 * Created by guillaumez on 2/26/14.
 */

module.exports = function (sequelize, DataTypes) {
    var Departement = sequelize.define('Departement', {
        nom: DataTypes.STRING
    });

    return Departement
}