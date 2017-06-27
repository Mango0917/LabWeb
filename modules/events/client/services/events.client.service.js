'use strict';


//Creates events factory for public events 
angular.module('events').factory('eventsPublic', ['$resource',
  function ($resource) {
    return $resource('api/events/:eventId', {
      eventId: '@_id'
    });
  }
]);