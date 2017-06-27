'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('events');

//user auth additions, modules for events
ApplicationConfiguration.registerModule('events.admin', ['core.admin']);
ApplicationConfiguration.registerModule('events.adminList', ['core.admin']);
ApplicationConfiguration.registerModule('events.admin.routes', ['core.admin.routes']);