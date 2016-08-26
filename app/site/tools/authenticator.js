var jwt = require('jsonwebtoken');

var constants = require('../constants/index');
var settings = require('./settings');
var expressJwt = require('express-jwt');
var logger = require(__common + '/tools/logger')('Authentificator');

var secret = new Buffer(__env.JWTSECRET, 'base64');
var anonymous = { isAuthenticated: false };
var cookieAge = 1000 * 60 * 60 * 24 * 7;

var jwtmidlware = expressJwt({
	secret: secret,
	getToken: function (req) {
		//console.log(req.cookies.authorization);
		
		if (req.cookies.authorization) {
			return req.cookies.authorization;
		}

		return jwt.sign(anonymous, secret);
	}
});

function sign(res, model) {
	var token = jwt.sign(model, secret);
	res.cookie('authorization', token, { maxAge: cookieAge, httpOnly: true });
	return token;
}


function logout(res) {
	var token = jwt.sign(anonymous, secret);
	res.cookie('authorization', token, { maxAge: cookieAge, httpOnly: true });
	return token;
}


module.exports = {
	midleware: jwtmidlware,
	sign: sign,
	logout: logout
};