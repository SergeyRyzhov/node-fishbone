var telegramUserModel = require('../models/telegramUser');
var userModel = require(__common + '/models/user');
var tokenModel = require(__common + '/models/token');

function signup(externalUser, req, cb) {
	userModel.load({
		criteria: { username: new RegExp(['^', req.name, '$'].join(''), 'i') }
	}, function (err, user) {
		if (err)
			cb(err, null, false);

		tokenModel.list({
			criteria: { user: user._id, token: req.token }
		}, function (err, token) {

			if (err)
				cb(err, null, false);

			telegramUserModel.createFor(externalUser, user, cb);

		});
	});
}

function verify(user) {
	user.createFor()
	return true;
}

module.exports = {
	signup: signup,
	verify: verify
};