/**
 * API controller for Departments.
 */

var db = require('../models');

exports.index = function (req, res) {
    db.Department.findAll()
        .success(function (departments) {
            res.send({
                departments: departments
            });
        });
};