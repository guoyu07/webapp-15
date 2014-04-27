module.exports = function (sequelize, DataTypes) {
    var Renewal = sequelize.define('Renewal', {
        type: DataTypes.ENUM('Host', 'Wwoofer'),
        paymentId: DataTypes.STRING,
        payerId: DataTypes.STRING,
        saleId: DataTypes.STRING,
        date: DataTypes.DATE
    }, {
        tableName: 'renewals',
        classMethods: {
            associate: function (models) {
                Renewal.belongsTo(models.User, { onDelete: 'cascade' })
            }
        }
    });
    return Renewal
};