/**
 * API controller for Photos.
 */
var db = require('../models'),
    path = require('path'),
    fs = require('fs'),
    appDir = path.dirname(require.main.filename),
    mimeTypes = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/tiff', 'image/png'],
    photoFolder = '\\public\\host_photos\\',
    updatableAttributes = ['caption'];

/**
 * Searches and returns a single photo.
 */
exports.single = function (req, res) {
    db.Photo.find({
        where: { id: req.params.id }
    }).success(function (photo) {
        if (!photo) {
            res.send(404);
        } else {
            res.send({ photo: photo });
        }
    }).error(function (error) {
        res.send(500, error);
    });
};

/**
 * Updates a photo.
 */
exports.update = function (req, res) {

    // Validate input
    if (!req.body.photo) {
        res.send(400);
        return;
    }

    // Find the photo (including the host to check ownership)
    db.Photo.find({
        where: { id: req.params.id },
        include: [
            {
                model: db.Host,
                where: { userId: req.user.id }
            }
        ]
    }).then(function (photo) {
        if (!photo) {
            return null;
        } else {
            return photo.updateAttributes(
                req.body.photo,
                updatableAttributes
            );
        }
    }).then(function (photo) {
        if (!photo) {
            res.send(404);
        } else {
            res.send({ photo: photo });
        }
    }, function (error) {
        res.send(500, error);
    });
};

/**
 * Uploads photos in the photo folder and create them in the database.
 */
exports.create = function (req, res) {

    // Declare variables
    var created = 0;
    var errors = 0;
    var chainer = new db.Sequelize.Utils.QueryChainer;

    req.files.files.forEach(function (file) {

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
        var newPath = appDir + photoFolder + newFileName;

        // Move the photo from the temporary path to the new path
        fs.rename(file.path, newPath, function (error) {

            // Handle errror
            if (error) {
                console.error('Cannot move photo ' + file.originalFilename + ' to ' + newPath + '.');
                console.error(error);
                return;
            }

            // Log
            console.log('Photo \'' + file.originalFilename + '\' moved to host_photo public folder (\'' + newFileName + '\').');

            // Create the photo in the database
            chainer.add(
                db.Photo.create({
                    fileName: newFileName,
                    hostId: req.body.hostId
                }).success(function (photo) {
                    created++;
                    console.log('Photo \'' + photo.fileName + '\' added in database.');
                }).error(function (error) {
                    // Remove file
                    fs.unlink(newPath);
                })
            );
        });
    });

    // Make sure all 'create' operations are complete before returning response
    chainer
        .run()
        .success(function (result) {
            res.send({ photo: 'test' });
        })
};