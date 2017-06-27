'use strict';

//creates admin event factory
angular.module('events.admin').factory('eventsAdmin', ['$resource',
  function ($resource) {

    //to update events
    return $resource('api/events/:eventId', {
      eventId: '@_id'
    },
      {
        update: {
          method: 'PUT'
        }
      });
  }
]);