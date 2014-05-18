module.exports = function (sequelize, DataTypes) {
    var Renewal = sequelize.define('Renewal', {
        type: DataTypes.ENUM('Host', 'Wwoofer'),
        paymentId: DataTypes.STRING,
        payerId: DataTypes.STRING,
        saleId: DataTypes.STRING,
        date: DataTypes.DATE,
        itemCode: DataTypes.ENUM('WO1', 'WO2', 'WOB1', 'WOB2', 'H', 'HR'),
        paymentType: DataTypes.ENUM('PPL', 'CHQ')
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