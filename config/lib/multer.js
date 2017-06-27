'use strict';

module.exports.profileUploadFileFilter = function (req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

module.exports.mp3UploadFilter = function (req, file, cb) {
  if (file.mimetype !== 'audio/mp3' && file.mimetype !== 'audio/wav') {
    return cb(new Error('Only mp3 files are allowed!'), false);
  }
  cb(null, true);
};
