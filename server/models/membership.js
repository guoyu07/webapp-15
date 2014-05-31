/**
 * Sequelize model for Memberships.
 * @param sequelize The Sequelize instance.
 * @param DataTypes The data types.
 * @returns {Object} The Sequelize model.
 */
module.exports = function (sequelize, DataTypes) {
    var Membership = sequelize.define('Membership', {
        type: DataTypes.ENUM('H', 'W'),
        paymentId: DataTypes.STRING,
        payerId: DataTypes.STRING,
        saleId: DataTypes.STRING,
        expireAt: DataTypes.DATE,
        itemCode: DataTypes.ENUM('WO1', 'WO2', 'WOB1', 'WOB2', 'H', 'HR'),
        paymentType: DataTypes.ENUM('PPL', 'CHQ'),
        total: DataTypes.DECIMAL
    }, {
        tableName: 'memberships',
        classMethods: {
            associate: function (models) {
                Membership.belongsTo(models.User, { onDelete: 'cascade' })
            }
        },
        instanceMethods: {
            /**
             * Returns the base price of a membership based on its item code.
             * @returns {Number} The base price for the item or false if not found.
             */
            getBasePrice: function () {
                switch (this.itemCode) {
                    case "WO1":
                        return 20;
                    case "WO2":
                        return 25;
                    case "WOB1":
                        return 30;
                    case "WOB2":
                        return 35;
                    case "H":
                        return 35;
                    case "HR":
                        return 30;
                    default:
                        return false;
                }
            }
        }
    });
    return Membership
};