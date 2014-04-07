module.exports = function (sequelize, DataTypes) {
    var Photo = sequelize.define('Photo', {
        fileName: DataTypes.STRING,
        caption: DataTypes.STRING
    }, {
        tableName: 'photos',
        classMethods: {
            associate: function (models) {
                Photo.belongsTo(models.Host)
            }
        }
    })
    return Photo
}