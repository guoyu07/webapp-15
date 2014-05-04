/**
 * API controller for Addresses.
 */
var db = require('../models');

/**
 * Updates an address.
 */
exports.update = function (req, res) {

    // Validate input
    if (!req.body.address)
        res.send(400);

    // Prepare where clause
    var whereClause = {
        where: {
            addressId: req.params.id,
            userId: req.user.id
        }
    };

    // Make sure that the address to be updated belongs to a host/wwoofer owned by the authenticated user
    db.Host.count(whereClause).success(function (count) {
        if (count <= 0) {
            // Host not found, try with the wwoofer
            db.Wwoofer.count(whereClause).success(function (count) {
                if (count <= 0) {
                    res.send(404);
                } else {
                    updateInternal(req, res);
                }
            }).error(function () {
                res.send(500, error);
            })
        } else {
            updateInternal(req, res);
        }
    }).error(function () {
        res.send(500, error);
    });
};

/**
 * Updates an address after passing security checks (i.e. authenticated user is allowed to update the object).
 */
var updateInternal = function (req, res) {
    // Find the original address
    db.Address.find({
        where: {
            id: req.params.id
        }
    }).success(function (address) {
        if (address) {
            // Get the updated address from body
            var updatedAddress = req.body.address;

            // Update the address
            address.updateAttributes({
                address1: updatedAddress.address1,
                address2: updatedAddress.address2,
                zipCode: updatedAddress.zipCode,
                city: updatedAddress.city,
                state: updatedAddress.state,
                countryId: updatedAddress.countryId,
                departmentId: updatedAddress.departmentId
            }).success(function (address) {
                res.send({
                    address: address
                })
            }).error(function (error) {
                res.send(500, error);
            })
        } else {
            res.send(404);
        }
    }).error(function (error) {
        res.send(500, error);
    });
};