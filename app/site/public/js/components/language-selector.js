define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'utils',
	'amplify'
], function (ko, _, storage, constants, localization, utils, amplify) {
	'use strict';

	return function (params) {
		var anchor = ko.observable(utils.purl.attr('fragment'));

		function liveSwitcher(options) {
			options.liveLink = function () {
				window.location.href = '/' + options.link + (anchor() ? '#' + anchor() : '');
			};
			return options;
		}
		var languages = utils.toObjectArray(params, 'link', 'title');

		function initialize() {
			amplify.subscribe(constants.events.navigation.any, anchor);
		}

		function dispose() {
			amplify.unsubscribe(constants.events.navigation.any, anchor);
		}

		initialize();

		return {
			languages: _.map(languages, liveSwitcher),
			dispose: dispose

		}
	};
});