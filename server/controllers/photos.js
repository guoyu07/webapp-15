/**
 * API controller for Photos.
 */
var db = require('../models'),
    path = require('path'),
    fs = require('fs'),
    appDir = path.dirname(require.main.filename),
    mimeTypes = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/tiff', 'image/png'];

exports.index = function(req, res){
  db.Photo.findAll({
    include: [ {model:db.Host, as:'host'} ],
    limit: 50
  }).success(function(photos) {
      res.send({
        photos: photos
      });
    });
};

exports.single = function(req, res) {
  db.Photo.find({
    include: [{model:db.Host, as:'host'}],
    where: {id: req.params.id}
  }).on('success', function(photo) {
      res.send({
        photo: photo
      });
    })
};

exports.create = function(req, res) {

  var created = 0;
  var errors = 0;
  var chainer = new db.Sequelize.Utils.QueryChainer;

  req.files.files.forEach(function(file) {

    if (mimeTypes.indexOf(file.headers['content-type']) == -1) {
      console.log('Unsupported file type: ' + file.headers['content-type'] + ' (' + file.name + ')');
      fs.unlinkSync(file.path);
      errors++;
      return;
      // res.send(415); // Unsupported Media Type
    }
    if (file.size > 5000000) { // 5mb
      console.log('File is too big: ' + file.size + ' bytes (' + file.name + ')');
      fs.unlinkSync(file.path);
      errors++;
      return;
      // res.send(413); // Request Entity Too Large
    }

    var newFileName = path.basename(file.path);
    var newPath = appDir + '\\public\\host_photos\\' + newFileName;

    fs.rename(file.path, newPath, function(err) {
      console.log('Photo \'' + file.originalFilename + '\' moved to host_photo public folder (\'' + newFileName + '\').');

      chainer.add(
        db.Photo
          .create({ whid: req.body.hostId, fileName: newFileName })
          .success(function(photo) {
            created++;
            console.log('Photo \'' + newFileName + '\' added in database.');
        })
      );
    });
  });

  chainer
    .run()
    .success(function(result){
      res.send({ photo: 'test' });
    })
};