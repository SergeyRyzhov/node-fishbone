var utils = require(__common + '/tools/utils');
var constants = require('../constants/index');

function defaultSettings(req) {
	return {
		culture: req.params.culture,
		labels: constants.labels.load(req.params.culture)
	};
}

function extendedSettings(req, extender) {
	return utils.merge(extender, defaultSettings(req));
}

module.exports = {
	'default': defaultSettings,
	extended: extendedSettings
};