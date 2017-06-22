'use strict';

const errors = require('./errors');

const apps = {};
module.exports = apps;

// Generic application class. You are free to substitute it with whatever suits
// your needs.
//   name - application name
//   api - application API
//   version - api version of 'name' application
//
class Application {
  constructor(name, api, version) {
    this.name = name;
    this.api = api;
    this.version = version;
  }

  // Call application method
  //   connection - JSTP connection
  //   interfaceName - name of the interface
  //   methodName - name of the method
  //   args - method arguments
  //   callback - method callback
  //
  callMethod(connection, interfaceName, methodName, args, callback) {
    const appInterface = this.api[interfaceName];
    if (!appInterface) {
      return callback(errors.ERR_INTERFACE_NOT_FOUND);
    }

    const method = appInterface[methodName];
    if (!method) {
      return callback(errors.ERR_METHOD_NOT_FOUND);
    }

    if (method.length !== args.length + 2) {
      return callback(errors.ERR_INVALID_SIGNATURE);
    }

    method(connection, ...args, callback);
  }

  // Get an array of methods of an interface
  //   interfaceName - name of the interface to inspect
  //
  getMethods(interfaceName) {
    const appInterface = this.api[interfaceName];
    return appInterface && Object.keys(appInterface);
  }
}

apps.Application = Application;

// Create an index of applications from an array
//   applications - array of JSTP applications
//
apps.createAppsIndex = (applications) => {
  const latestApps = new Map();
  const index = new Map();

  applications.forEach((application) => {
    let appVersions = index.get(application.name);
    if (!appVersions) {
      appVersions = new Map();
      index.set(application.name, appVersions);
    }
    if (!application.version) {
      // no version means default version
      if (appVersions.get('latest')) {
        throw new Error(
          `Multiple entries of '${application.name} without version`
        );
      } else {
        appVersions.set('latest', application);
      }
    } else {
      appVersions.set(application.version.toString(), application);

      // save latest version to fill missing latest versions later
      const latestApp = latestApps.get(application.name);
      if (!latestApp || application.version > latestApp.version) {
        latestApps.set(application.name, application);
      }
    }
  });

  // set latest versions of apps without explicit latest version
  latestApps.forEach((application, appName) => {
    const appVersions = index.get(appName);
    if (!appVersions.get('latest')) appVersions.set('latest', application);
  });

  return index;
};
