'use strict';

var events = require('../controllers/event.server.controller');
var adminPolicy = require('../../../users/server/policies/admin.server.policy');

//route to get all events or add an event
module.exports = function (app) {
  app.route('/api/events')
    .get(/*adminPolicy.isAllowed,*/events.list)
    .post(adminPolicy.isAllowed,events.create);

    //routes for sing event detail, update, and delete
  app.route('/api/events/:eventId')
    .get(/*adminPolicy.isAllowed,*/events.read)
    .put(adminPolicy.isAllowed,events.update)
    .delete(adminPolicy.isAllowed,events.delete);

  //route to change photo
  app.route('/api/events/picture').post(events.changePicture);

  app.param('eventId', events.eventByID);
};
