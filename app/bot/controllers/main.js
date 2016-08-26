var constants = require('../constants');
var labels = constants.labels;
var settings = constants.settings;

var formFactory = require('../tools/formFactory');

var _ = require('underscore');

var auth = require('../tools/authenticator');

var culture = settings.common.defaultCulture;
if (labels.hasCulture(culture)) {
	labels = labels.load(culture);
}

function signinForm($, cb) {
	var form = formFactory.create(labels.auth.form,
		(f) => {
			f.string('name');
			f.number('token');
		});
	$.runForm(form, cb);
}

function signupForm($, cb) {
	$.sendMessage(labels.auth.signup.title);
}

function buildMenu($) {
	var menu = {
		message: labels.menu.title
	};

	var startMenu = {
		message: labels.start.title
	};

	startMenu[labels.start.yes] = () => signinForm($, linkAccount.bind(_.noop, $));
	startMenu[labels.start.no] = () => signupForm($, console.log);
	
	menu[labels.menu.start] = startMenu;

	return menu;
}



function end($) {
	$.sendMessage(labels.end);
	$.runMenu(buildMenu($));
}

function linkAccount($, data) {
	console.log('Link account', data);
	console.log('Context', $.user);
	auth.signup($.user, data, (err, bridge, success) => {
		if (success) {

			$.sendMessage(JSON.stringify(bridge));
		}
	});

	end($);
}

module.exports = ($) => {
	$.runMenu(buildMenu($));
};
