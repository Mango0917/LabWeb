'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('research');

//user auth additions
ApplicationConfiguration.registerModule('research.admin', ['core.admin']);
ApplicationConfiguration.registerModule('research.admin.routes', ['core.admin.routes']);