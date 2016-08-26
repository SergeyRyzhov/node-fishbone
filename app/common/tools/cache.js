function cache(argument) {
	var logger = require("./logger.js")('cache');

	this.storage = {};

	this.get = function (ckey, cdefault) {
		var skey = 'key_' + ckey;
		if (this.storage[skey]) {
			logger.debug('Value for "' + ckey + '" loaded from cache');
			return this.storage[skey];
		}

		if (cdefault) {
			this.set(ckey, cdefault);
			return cdefault;
		}

		return null;
	};

	this.set = function (ckey, cvalue) {
		var skey = 'key_' + ckey;
		if (cvalue) {
			logger.debug('Value for "' + ckey + '" stored in cache');
			this.storage[skey] = cvalue;
		}
	};

	return this;
}

module.exports = new cache();
