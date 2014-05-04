module.exports = function (sequelize, DataTypes) {
    var Host = sequelize.define('Host', {
        suspended: DataTypes.BOOLEAN,
        farmName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [5, 50] }
        },
        shortDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [5, 200] }
        }, // (location)
        fullDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [5, 500] }
        }, // (entry)
        webSite: {
            type: DataTypes.STRING,
            validate: { isUrl: true }
        },
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