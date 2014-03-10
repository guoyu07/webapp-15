/**
 * API controller for Departements.
 */

var db = require('../models');

exports.index = function(req, res){
  db.Departement.findAll()
    .success(function(departements) {
      res.send({
        departements: departements
      });
    });
};