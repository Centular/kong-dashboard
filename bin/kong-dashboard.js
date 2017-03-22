#!/usr/bin/env node

var dashboard = require('../lib/kong-dashboard');
var parseArgs = require('minimist');
var argv = parseArgs(process.argv.slice(2));

// validate options
var validOptions = ['_', 'a', 'p', 'h'];
function hasInvalidOptions (argv) {
    var isInvalid = false;
    Object.keys(argv).some(function (optionName) {
        if (validOptions.indexOf(optionName) < 0) {
            isInvalid = true;
            return true;
        }
    });
    return isInvalid;
}

// show help
var validCommands = ['start', 'build']
if (argv.help || hasInvalidOptions(argv) || validCommands.indexOf(argv._[0]) < 0) {
    console.log("Usage:");
    console.log(" * kong-dashboard build");
    console.log(" * kong-dashboard start [-p 8080] [-a user=password] [-h http://localhost:8001]");
    process.exit();
}

// build assets
if (argv._[0] === 'build') {
    dashboard.build();
}

// start server
if (argv._[0] === 'start') {
    var port = argv.p ? argv.p : 8080;
    var auth = argv.a;
    var host = argv.h;
    dashboard.serve(port, auth,host);
}
