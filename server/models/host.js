module.exports = function (sequelize, DataTypes) {
    var Host = sequelize.define('Host', {
        farmName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [5, 50] }
        },
        shortDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [5, 255] }
        }, // (location)
        fullDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { len: [5, 1500] }
        }, // (entry)
        webSite: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { isUrl: true }
        },
        travelDetails: DataTypes.STRING,
        noPhone: DataTypes.BOOLEAN,
        noEmail: DataTypes.BOOLEAN,
        note: DataTypes.STRING, // (legend)
        isPending: DataTypes.BOOLEAN, // Whether the host is pending validation from an admin
        isSuspended: DataTypes.BOOLEAN // Whether the host has been manually disabled by an admin
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