define([
	'underscore'
], function (_) {

	return {
		keys: {
			culture: 'culture'
		},
		events: {
			navigation: {
				page: 'app.navigation.page',
				any: 'app.navigation.any'
			}
		},
		common: {
			//authpaths: ['account'], //todo. load from server
			bindingTimeout: 500
		}
	};
});