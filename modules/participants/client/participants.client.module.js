'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('participants');
ApplicationConfiguration.registerModule('participants.admin', ['core.admin']);
ApplicationConfiguration.registerModule('participants.admin.routes', ['core.admin.routes']);
