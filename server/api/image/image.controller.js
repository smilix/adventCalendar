'use strict';

var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var _ = require('lodash');
var Download = require('download');

// Get list of images
exports.index = function (req, res) {
  var dir = 'uploads/';
//  var files = fs.readdirSync('uploads/');

  var files = fs.readdirSync(dir)
    .map(function (v) {
      return { name: v,
        time: fs.statSync(dir + v).mtime.getTime()
      };
    })
    .sort(function (a, b) {
      return b.time - a.time;
    })
    .map(function (v) {
      return v.name;
    });

  res.json(files);
};

exports.upload = function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function (fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    var new_location = 'uploads/';

    fs.copy(temp_path, new_location + file_name, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
};

exports.fromUrl = function (req, res) {
  var url = req.param('url');
  if (!url || url.indexOf('http') !== 0) {
    res.status(400).send('no or invalid url given.');
    return;
  }

  var download = new Download({ mode: '755' })
    .get(req.body.url)
    .dest('uploads/')
    .rename({
      prefix: Date.now() + '_'
    });

  download.run(function (err, files, stream) {
    if (err) {
      res.status(500).send('download error: ' + err);
      return;
    }

    console.log('File downloaded successfully!');
    res.send('ok');
  });
};