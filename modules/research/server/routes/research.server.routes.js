'use strict';

var research = require('../controllers/research.server.controller');
var adminPolicy = require('../../../users/server/policies/admin.server.policy');

module.exports = function (app) {
  app.route('/api/research')
  .get(/*adminPolicy.isAllowed,*/research.list)
  .post(adminPolicy.isAllowed,research.create);

  app.route('/api/research/:researchId')
  .get(/*adminPolicy.isAllowed,*/research.read)
  .put(adminPolicy.isAllowed,research.update)
  .delete(adminPolicy.isAllowed,research.delete);
  
  app.route('/api/research/picture').post(research.changePicture);
  app.param('researchId', research.researchByID);
};
