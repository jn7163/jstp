'use strict';

const test = require('tap');

const jstp = require('../..');

const app = require('../fixtures/application');

const interfacesV1 = {
  calculator: {
    answer(connection, callback) {
      callback(null, 42);
    },
  }
};

const interfacesV2 = {
  calculator: {
    answer(connection, callback) {
      callback(null, 24);
    },
  }
};

const interfacesVLatest = {
  calculator: {
    answer(connection, callback) {
      callback(null, 13);
    },
  }
};

const appV1 = new jstp.Application(app.name, interfacesV1, 1);
const appV2 = new jstp.Application(app.name, interfacesV2, 2);
const appVlatest = new jstp.Application(app.name, interfacesVLatest);

let server;
let connection;

test.afterEach((done) => {
  if (connection) {
    connection.close();
    connection = null;
  }
  server.close();
  done();
});

test.test('must handle specific versions', (test) => {
  const serverConfig = {
    applications: [appV1, appV2, appVlatest], authPolicy: app.authCallback
  };
  server = jstp.net.createServer(serverConfig);
  server.listen(0, () => {
    test.plan(9);

    const port = server.address().port;

    let client = null;
    // latest
    jstp.net.connect(app.name, client, port, (error, conn) => {
      test.assertNot(error, 'connect must not return an error');
      conn.callMethod('calculator', 'answer', [], (error, result) => {
        test.assertNot(error, 'callMethod must not return an error');
        test.strictSame(result, 13);
        conn.close();
      });
    });

    // v1
    client = {
      connectPolicy: new jstp.SimpleConnectPolicy(null, null, '1')
    };
    jstp.net.connect(app.name, client, port, (error, conn) => {
      test.assertNot(error, 'connect must not return an error');
      conn.callMethod('calculator', 'answer', [], (error, result) => {
        test.assertNot(error, 'callMethod must not return an error');
        test.strictSame(result, 42);
        conn.close();
      });
    });

    // v2
    client = {
      connectPolicy: new jstp.SimpleConnectPolicy(null, null, '2')
    };
    jstp.net.connect(app.name, client, port, 'localhost', (error, conn) => {
      test.assertNot(error, 'connect must not return an error');
      conn.callMethod('calculator', 'answer', [], (error, result) => {
        test.assertNot(error, 'callMethod must not return an error');
        test.strictSame(result, 24);
        conn.close();
      });
    });
  });
});

test.test('must return an error on connect to nonexistent version', (test) => {
  const serverConfig =
    { applications: [appV1, appV2, appVlatest], authPolicy: app.authCallback };
  server = jstp.net.createServer(serverConfig);
  server.listen(0, () => {
    const port = server.address().port;
    const client = {
      connectPolicy: new jstp.SimpleConnectPolicy(null, null,
        '__nonexistent_version__')
    };
    jstp.net.connect(app.name, client, port, (error) => {
      test.assert(error, 'connect must return an error');
      test.equal(error.code, jstp.ERR_APP_NOT_FOUND,
       'error must be an ERR_APP_NOT_FOUND');
      test.end();
    });
  });
});

test.test('must set biggest version as latest versions', (test) => {
  const serverConfig =
    { applications: [appV1, appV2], authPolicy: app.authCallback };
  server = jstp.net.createServer(serverConfig);
  server.listen(0, () => {
    const port = server.address().port;
    jstp.net.connect(app.name, null, port, (error, conn) => {
      connection = conn;
      connection.callMethod('calculator', 'answer', [], (error, result) => {
        test.assertNot(error, 'callMethod must not return an error');
        test.strictSame(result, 24);
        test.end();
      });
    });
  });
});
