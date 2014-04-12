/**
 * Created by guillaumez on 3/9/14.
 */

var db = require('../models');

exports.index = function (req, res) {

    // Extract query params
    var limit = isNaN(parseInt(req.query.limit)) ? 20 : parseInt(req.query.limit),
        offset = isNaN(parseInt(req.query.offset)) ? 0 : parseInt(req.query.offset);
//        dpt = (req.query.dpt || '') + '%',
//        searchTerm = req.query.searchTerm || '',
//        where = ["contact like ? and zipCode like ?", '%' + searchTerm + '%', dpt + '%'];

    // Find all hosts matching parameters
    db.Wwoofer.findAndCountAll({
        limit: limit,
        offset: offset
        // where: where
    }).success(function (wwoofers) {
            res.send({
                wwoofers: wwoofers.rows,
                meta: {
                    offset: offset,
                    limit: limit,
                    total: wwoofers.count
                }
            });
        });
};

exports.single = function (req, res) {
    db.Wwoofer.find({
        where: {id: req.params.id}
    }).on('success', function (wwoofer) {
            res.send({
                wwoofer: wwoofer
            });
        })
};