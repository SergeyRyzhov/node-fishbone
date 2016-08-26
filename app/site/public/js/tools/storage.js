define([
	'underscore',
	'jquery',
	'amplify',
	'jquery.cookie'
], function (_,$, amplify, cookieStorage) {
	'use strict';

	var session = {
		set: function (key, value, options) {
			amplify.store.sessionStorage(key, value, options);
		},
		get: function (key) {
			return amplify.store.sessionStorage(key);
		},
		remove: function (key) {
			amplify.store.sessionStorage(key, null);
		}
	};

	var cookie = {
		set: function (key, value, options) {
			cookieStorage(key, value, options);
		},
		get: function (key) {
			return cookieStorage(key);
		},
		remove: function (key) {
			cookieStorage(key, null);
		}
	};

	return {
		session: session,
		cookie: cookie
	};
});