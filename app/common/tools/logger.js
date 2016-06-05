module.exports = function (name) {
	var log4js = require("log4js");
	log4js.configure({
		"appenders": [
			{
				type: 'console'
			}]
	});
	return log4js.getLogger(name);
};
