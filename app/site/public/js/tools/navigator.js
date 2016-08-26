define([
	'underscore',
	'constants',
	'utils',
	'storage',
	'sammy',
	'amplify'
], function (_, constants, utils, storage, sammy, amplify) {
	'use strict';

	function registerMenuPaths(paths) {
		var menu = sammy(function () {
			var app = this;
			_.each(paths, function (path) {
				app.get('#' + path, function () {
					amplify.publish(constants.events.navigation.page, path);
					amplify.publish(constants.events.navigation.any, path);
				});
			});
		});
		menu.run();
	}

	function upgradeDom() {
		componentHandler.upgradeDom();
		setTimeout(upgradeDom, constants.common.bindingTimeout);
	}

	return {
		registerMenu: registerMenuPaths,
		upgradeDom: upgradeDom
	};
});