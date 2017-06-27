'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('audioFiles');
ApplicationConfiguration.registerModule('audioFiles.admin', ['core.admin']);
ApplicationConfiguration.registerModule('audioFiles.admin.routes', ['core.admin.routes']);
