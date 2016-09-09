[![Build Status](https://travis-ci.org/metarhia/JSTP.svg?branch=master)](https://travis-ci.org/metarhia/JSTP)
[![Dependency Status](https://david-dm.org/metarhia/JSTP.svg)](https://david-dm.org/metarhia/JSTP)

# JSTP / JavaScript Transfer Protocol

## Concept

JSTP is a family of data formats and corresponding libraries for their
processing that are based on some simple assumptions:

* it is possible to trasfer data as plain JavaScript code easier and
  more efficient than using JSON:
  - in its simplest implementation it doesn't even require a specialized
    parser since it is already built into transferer and receiver systems;
  - a human-readable format can be almost as minimalist as a binary one,
    losing coding efficiency very slightly yet winning from the simplicity
    of packet inspection;
  - serialization format and data modeling must be maximally univocal and
    must answer a question about why someone has done something this way;
  - there should be possibility to apply different formatting and use
    comments;
* it is redundant to send a structure along with data each time, the
  serialization format and the protocol must be optimized to exempt
  metamodel and send it only when the receiver hasn't got it yet;
* the protocol of interaction between two JavaScript applications must
  have the following features:
  - two-way asynchronous data transfer with support of plentiful parallel
    non-blocking interactions and packet indentifiers allowing, for example,
    to find the correspondence between a request and a response;
  - support of RPC and multiple APIs must be so transparent that application
    shouldn't event know whether a function call is inside the address space
    of the application or it is a remote call sent to another system for
    execution;
  - direct call and response via callback support;
  - support of translation of named events with bound data and named channels
    for event grouping;
  - support of automatic synchronization of objects in applications memory
    if they are registered for synchronization;
  - only one of sides can initiate a connection but both sides can send data
    over open channel;
  - the transport layer must guarantee reliable data transfer with connection
    establishment and guaranteed delivery (TCP is the basic transport and we
    also support WebSocket but anything can be used, even RS232 or USB);
  - all packet types (call, response, callback, event, data etc.) may be split
    into several parts if their body is too large;
  - there should be a possibility to stop data transfer if the data transmitted
    in parts is too large and the last part hasn't been received yet;
* it is required to minimize the transformation of data while tranferring them
  between different systems, storing and processing, minimize putting them from
  one structures to other, to save memory and connection channel;
* amount of data structures needed for most systems is in fact finite and the
  structures themselves must be standardized as a result of specialists
  agreement, and there should be possibility of their versioning;
* non-standard data structures can be sent between systems along with metadata
  that will allow to interprete them and provide universal processing to the
  possible extent if the remote sides trust each other and formalization of
  data doesn't make sense.

## Documentation

See the [docs/](https://github.com/metarhia/JSTP/tree/master/docs) directory
for documentation.

* [Introduction](docs/intro.md)
* [Data Formats](docs/data-formats.md)
* [Network Protocol](docs/protocol.md)

## Other Implementations

| Platform or Language | Repository | Parser | TCP Client | TCP Server | WebSocket Client | WebSocket Server | Status |
| --- | --- | :---: | :---: | :---: | :---: | :---: | --- |
| Node.js and Impress Application Server | [metarhia/Impress/lib/api.jstp.js](https://github.com/metarhia/Impress/blob/master/lib/api.jstp.js) | ✓ | ✓ | ✓ | ✗ | ✓ | proof of concept, will be replaced with this library soon |
| JavaScript for web browsers | [metarhia/Impress/applications/example/static/js/impress.js](https://github.com/metarhia/Impress/blob/master/applications/example/static/js/impress.js) | ✓ | ✗ | ✗ | ✓ | ✗ | proof of concept, will be replaced with this library soon |
| C++ | [NechaiDO/JSTP-cpp](https://github.com/NechaiDO/JSTP-cpp) | ✓ | ✗ | ✗ | ✗ | ✗ | stable |
| Qt C++ | [NechaiDO/QJSTP](https://github.com/NechaiDO/QJSTP) | ✓ | ✗ | ✗ | ✗ | ✗ | stable |
| iOS (Swift) | [JSTPMobile/iOS](https://github.com/JSTPMobile/iOS) | ✓ | ✗ | ✗ | ✗ | ✗ | in development |
| Java | [JSTPMobile/Java](https://github.com/JSTPMobile/Java) | ✓ | ✓ | ✗ | ✗ | ✗ | stable |
| C# | [JSTPKPI/JSTP-CS](https://github.com/JSTPKPI/JSTP-CS) | ✓ | ✗ | ✗ | ✗ | ✗ | stable |
| Python | [mitchsvik/JSTP-Python](https://github.com/mitchsvik/JSTP-Python) | partially | ✗ | ✗ | ✗ | ✗ | proof of concept |
| Haskell | [DzyubSpirit/JSTPHaskellParser](https://github.com/DzyubSpirit/JSTPHaskellParser) | ✓ | ✓ | ✓ | ✗ | ✗ | stable |
| PHP | [Romm17/JSTPParserInPHP](https://github.com/Romm17/JSTPParserInPHP) | ✓ | ✗ | ✗ | ✗ | ✗ | stable |
| GoLang | [belochub/jstp-go](https://github.com/belochub/jstp-go) | ✗ | ✗ | ✗ | ✗ | ✗ | in development |
