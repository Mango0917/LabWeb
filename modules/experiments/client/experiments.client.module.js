'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('experiments');
ApplicationConfiguration.registerModule('experiments.admin', ['core.admin']);
ApplicationConfiguration.registerModule('experiments.admin.routes', ['core.admin.routes']);
