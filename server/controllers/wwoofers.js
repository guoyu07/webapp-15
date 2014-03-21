/**
 * Created by guillaumez on 3/9/14.
 */

var db = require('../models');

exports.index = function(req, res){

    // Extract query params
    var limit = isNaN(parseInt(req.query.limit)) ? 20 : parseInt(req.query.limit),
        offset = isNaN(parseInt(req.query.offset)) ? 0 : parseInt(req.query.offset);
//        dpt = (req.query.dpt || '') + '%',
//        searchTerm = req.query.searchTerm || '',
//        where = ["contact like ? and zipCode like ?", '%' + searchTerm + '%', dpt + '%'];

    // Find all hosts matching parameters
    db.Wwoofer.findAll({
        limit: limit,
        offset: offset
        // where: where
    }).success(function(wwoofers) {

            // Count total hosts
            db.Wwoofer.count({
                // where: where
            }).on('success', function(count) {
                    res.send({
                        wwoofers: wwoofers,
                        meta: {
                            offset: offset,
                            limit: limit,
                            total: count
                        }
                    });
                })
        });
};

exports.single = function(req, res) {
    db.Wwoofer.find({
        where: {id: req.params.id}
    }).on('success', function(wwoofer) {
            res.send({
                wwoofer: wwoofer
            });
        })
};