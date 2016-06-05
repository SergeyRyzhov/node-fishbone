'use strict';

module.exports = function () {
	var tg = require('telegram-node-bot')(__env.BOTTOKEN);

	tg.router.when(['help'], 'main').otherwise('main');
	
	tg.controller('main', require('./controllers/main'));
};