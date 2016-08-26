define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'amplify',
	'moment',
	'responsejs',
	'json!/api/telegram/token',
	'json!/api/telegram/users'
], function (ko, _, storage, constants, localization, amplify, moment, responsejs, token, users) {
	return function () {
		token = token.token;
		users = users.users;
		
		function getToken(elementName) {
			var element = document.getElementById(elementName);
			componentHandler.upgradeElement(element);
			element.MaterialSnackbar.showSnackbar({
				message: token,
				actionHandler: function (event) { },
				actionText: ' ',
				timeout: 5000
			});
		}

		return {
			token: token,
			hasUsers: users.length > 0,
			users: users,

			getToken: getToken
		};
	};
});