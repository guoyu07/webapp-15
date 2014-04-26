module.exports = function (sequelize, DataTypes) {
    var Host = sequelize.define('Host', {
        suspended: DataTypes.BOOLEAN,
        farmName: DataTypes.STRING,
        shortDescription: DataTypes.STRING, // (location)
        fullDescription: DataTypes.STRING, // (entry)
        webSite: DataTypes.STRING,
        travelDetails: DataTypes.STRING,
        noPhone: DataTypes.BOOLEAN,
        noEmail: DataTypes.BOOLEAN,
        note: DataTypes.STRING, // (legend)
        deletionDate: DataTypes.DATE
    }, {
        tableName: 'hosts',
        classMethods: {
            associate: function (models) {
                Host.hasMany(models.Photo, { onDelete: 'cascade', as: 'photos' });
                Host.belongsTo(models.User);
                Host.belongsTo(models.Address)
            }
        }
    });
    return Host
};