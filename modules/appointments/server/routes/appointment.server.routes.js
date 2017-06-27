'use strict';

var appointments = require('../controllers/appointment.server.controller');
var adminPolicy = require('../../../users/server/policies/admin.server.policy');

module.exports = function (app) {
  app.route('/api/appointments')
    .get(adminPolicy.isAllowed, appointments.list)
    .post(adminPolicy.isAllowed, appointments.create);

  app.route('/api/appointments/:appointmentId')
    .get(adminPolicy.isAllowed, appointments.read)
    .put(adminPolicy.isAllowed, appointments.update)
    .delete(adminPolicy.isAllowed, appointments.delete);

  app.param('appointmentId', appointments.appointmentByID);
};
