'use strict';

// Simple generic connection provider. Used for user-side connection.
// You are free to implement whatever suits your needs instead.
// Sends handshake with login/password if provided otherwise sends
// anonymous handshake.
//
module.exports = class SimpleConnectPolicy {
  constructor(login, password, version) {
    this.login = login;
    this.password = password;
    this.version = version;
  }

  // Should send handshake packet with appropriate credentials
  // You can get client object provided upon connection creation
  // with connection.client.
  //   connection - JSTP connection
  //   callback - callback function that has signature
  //              (error, connection)
  //
  connect(appName, connection, callback) {
    const app = { name: appName, version: this.version };
    connection.handshake(app, this.login, this.password, (error) => {
      callback(error, connection);
    });
  }
};
