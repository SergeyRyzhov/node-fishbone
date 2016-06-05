define([
	'underscore',
	'constants',
	'utils',
	'storage',
	'moment'
], function (_, constants, utils, storage, moment) {
	'use strict';

	var culture = utils.purl.segment(1);
	var userCulture = storage.cookie.get(constants.keys.culture);

	if (culture != userCulture)
		storage.cookie.set(constants.keys.culture, culture, { path: '/' });
	moment.locale(culture);

	return {
		culture: culture
	};
});