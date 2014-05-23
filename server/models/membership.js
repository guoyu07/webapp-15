module.exports = function (sequelize, DataTypes) {
    var Membership = sequelize.define('Membership', {
        type: DataTypes.ENUM('Host', 'Wwoofer'),
        paymentId: DataTypes.STRING,
        payerId: DataTypes.STRING,
        saleId: DataTypes.STRING,
        expireAt: DataTypes.DATE,
        itemCode: DataTypes.ENUM('WO1', 'WO2', 'WOB1', 'WOB2', 'H', 'HR'),
        paymentType: DataTypes.ENUM('PPL', 'CHQ')
    }, {
        tableName: 'memberships',
        classMethods: {
            associate: function (models) {
                Membership.belongsTo(models.User, { onDelete: 'cascade' })
            }
        }
    });
    return Membership
};