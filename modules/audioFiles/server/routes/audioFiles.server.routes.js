'use strict';

/**
 * Module dependencies.
 */
var audioFiles = require('../controllers/audioFiles.server.controller');
var adminPolicy = require('../../../users/server/policies/admin.server.policy');

module.exports = function (app) {
    // audioFiles collection routes
  app.route('/api/audioFiles')
        .get(/*adminPolicy.isAllowed,*/audioFiles.list)
        .post(adminPolicy.isAllowed,audioFiles.create);

    // Single participant routes
  app.route('/api/audioFiles/:audioFileId')
        .get(audioFiles.read)
        .put(adminPolicy.isAllowed,audioFiles.update)
        .delete(adminPolicy.isAllowed,audioFiles.delete);
  //route for uploading audio to server
  app.route('/api/audioFiles/upload').post(adminPolicy.isAllowed,audioFiles.uploadMp3File);
  //route to retrieve audio from server
  app.route('/api/audioFiles/mp3').post(adminPolicy.isAllowed,audioFiles.getMp3);
    // Finish by binding the participant middleware
  app.param('audioFileId', audioFiles.audioFileByID);
};
