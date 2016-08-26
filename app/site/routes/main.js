function init(router) {
	var constants = require('../constants/index');
	var settings = require('../tools/settings');

	router.get('/:culture', function (req, res, next) {
		if (constants.labels.hasCulture(req.params.culture))
			res.render('index', settings.extended(req, { user: req.user }));
		else
			res.redirect('/' + constants.settings.common.defaultCulture);
	});

	router.get('/', function (req, res, next) {
		if (req.cookies.culture)
			res.redirect('/' + req.cookies.culture);
		else
			res.redirect('/' + constants.settings.common.defaultCulture);
	});

	router.get('/:culture/components/:name', function (req, res, next) {
		if (constants.labels.hasCulture(req.params.culture))
			res.render('components/' + req.params.name, settings.default(req));
		else
			res.render('components/error', settings.default(req));
	});
}
module.exports = { init: init };
