define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization'
], function (ko, _, storage, constants, localization) {
	'use strict';
	
	return function (params) {
		var user = params.user;

		return {
			user: user
		}
	};
});