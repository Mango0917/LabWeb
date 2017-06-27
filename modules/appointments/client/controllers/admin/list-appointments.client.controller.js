'use strict';

angular.module('appointments.admin').controller('AppointmentListController', ['$scope', '$filter', 'appointmentAdmin', '$compile', '$timeout', 'uiCalendarConfig', '$location',
  function ($scope, $filter, appointmentAdmin, $compile, $timeout, uiCalendarConfig, $location) {
    
    // Get Today's Info
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    // List of events that will maintain appointments for calendar
    $scope.events = [];
    
    // Query appointments from DB and assign them to scope
    appointmentAdmin.query(function (data) {
      $scope.appointments = data;
      for(var i = 0; i< $scope.appointments.length; i++){

        // Get start time of i'th appointment
        var j = new Date();
        j.setTime(Date.parse($scope.appointments[i].time));
        $scope.appointments[i].time = j.toLocaleString();

        // Get end time of i'th appointment
        var d = new Date();
        d.setTime(Date.parse($scope.appointments[i].time) + ($scope.appointments[i].duration * 60 * 1000));

		// Construct display text for i'th appointment in calendar
        var appointmentTitle = $scope.appointments[i].participant.name + '\n';
        appointmentTitle = appointmentTitle.concat($scope.appointments[i].experiment.experiment_name + '\n');
        appointmentTitle = appointmentTitle.concat($scope.appointments[i].location);

        // Finally add to events
        $scope.events.push({
          title: appointmentTitle,
          start: j,
          end: d,
          className: ['openSesame'],
          url: $location.absUrl() + '/' + $scope.appointments[i]._id,
          id: $scope.appointments[i]._id
        });
      }
      $scope.buildPager();
    });


    // Event source that calls approprite callback function on view-switches
    $scope.eventsF = function (start, end, timezone, callback) {
      // Let callback function execute on events
      callback($scope.events);
    };

    // Alert when clicking on event
    $scope.alertOnEventClick = function(date, jsEvent, view){
      $scope.alertMessage = ('\tLoading...');
    };

    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };


    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

    /* Change View */
    $scope.changeView = function(view,calendar) {
      $timeout(function() {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
      });
    };

    /* Render View */
    $scope.renderCalender = function(calendar, view) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
          uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        }
      });
    };

     /* Render Tooltip */
    $scope.eventRender = function(event, element, view) {
      element.attr({ 'tooltip': event.title,'tooltip-append-to-body': false });
      $compile(element)($scope);
    };



    // CALENDAR CONFIGURATIONS
    $scope.uiConfig = {
      calendar:{
        height: 'auto',
        editable: false,
        header:{
          left: '',
          center: 'title',
          right: 'today prev,next'
        },
        views: {
          agenda: {
            allDaySlot: false,
            snapDuration: { minutes: 15 },
            slotDuration: { minutes: 30 },
            slotLabelInterval: { minutes: 15 },
            slotEventOverlap: false,
            minTime: { hours: 6, minutes: 0 },
            maxTime: { hours: 18, minutes: 0 }
          },
          week: {
            titleFormat: '(MMMM D YYYY)'
          },
          month: {
            titleFormat: 'MMMM YYYY'
          }
        },
        dayClick: function(date, jsEvent, view) {
          //console.log('Clicked on a day! ' + view.name);
          for(var i in uiCalendarConfig.calendars){
            //console.log('For Loop Running!\n');
            var v = uiCalendarConfig.calendars[i].fullCalendar('getView');
            //console.log(v);
            if(v.name === 'agendaDay'){
              uiCalendarConfig.calendars[i].fullCalendar('gotoDate', date);
            }
          }          
        },
        weekends: false,
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };


    // Put together event construct that calendar needs
    $scope.eventSources = [$scope.events, $scope.eventsF];


    // Ensure the calendars are in proper view
    angular.element(document).ready(function () {
      $scope.changeView('agendaWeek','MainCalendar');
      $scope.changeView('agendaDay','DayCalendar');
    });


    // Pager setup functions to show all appointments in list view
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.appointments, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
