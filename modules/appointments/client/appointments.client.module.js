'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('appointments');
ApplicationConfiguration.registerModule('appointments.admin', ['core.admin', 'ui.calendar', 'ui.bootstrap']);
ApplicationConfiguration.registerModule('appointments.admin.routes', ['core.admin.routes']);
