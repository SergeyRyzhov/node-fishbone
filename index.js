/* global global, __base, __common, __site, __bot, __env */
global.__base = __dirname + '/';
global.__apps = __dirname + '/app';
global.__common = __dirname + '/app/common';
global.__site = __dirname + '/app/site';
global.__bot = __dirname + '/app/bot';

global.__env = process.env;

var bot = require(__bot)();
var site = require(__site)();