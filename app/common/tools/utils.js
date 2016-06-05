var _ = require('underscore');

function merge(target, source) {
	_.defaults(target, source);
	for (var prop in target) {
		if (target.hasOwnProperty(prop) && typeof (source[prop]) === 'object') {
			merge(target[prop], source[prop]);
		}
	}
	return target;
}

module.exports = {
	merge: merge
};