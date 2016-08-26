function init(router) {
	var authenticator = require('../tools/authenticator');
	var tokenModel = require(__common + '/models/token');
	var telegramUserModel = require(__bot + '/models/telegramUser');
	var _ = require('underscore');
	var constants = require('../constants');


	router.get('/api/telegram/token', authenticator.midleware, function (req, res, next) {
		tokenModel.createFor(req.user, function (err, token) {
			res.send({ token: token.token });
		});
	});

	router.get('/api/telegram/users', authenticator.midleware, function (req, res, next) {
		telegramUserModel.loadForOwnUser(req.user, function (err, users) {
			var userModels = _.map(users, function (user) {
				var fName = user.firstName || '';
				var lName = user.lastName || '';
				
				//todo underscore strings
				return {
					text: fName || lName ? (fName + ' ' + lName) : user.username,
					link: constants.settings.telegram.link + user.username,
					username: user.username
				};
			});
			res.send({ users: userModels });
		});
	});
}
module.exports = { init: init };
