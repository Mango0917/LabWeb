'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('publications');
ApplicationConfiguration.registerModule('publications.admin', ['core.admin']);
ApplicationConfiguration.registerModule('publications.admin.routes', ['core.admin.routes']);
