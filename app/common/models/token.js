var mongodb = require('../tools/mongodb.js');
var crypto = require('crypto');
var tokenizer = require('rand-token').generator({
	chars: 'numeric',
	source: 'crypto'
});

var Schema = mongodb.schema;
var mongo = mongodb.mongo;

var _ = require('underscore');

var schema = new Schema({
	token: { type: Number, default: 0, required: true },	
	user: { type: Schema.ObjectId, ref: 'User', required: true }
});

schema.methods = {

};

schema.statics = {
	load: function (id, cb) {
		this.findOne({ _id: id })
			.populate('user', 'email username phone')
			.exec(cb);
	},

	list: function (options, cb) {
		this.find(options.criteria)
			.populate('user', 'email username phone')
			.limit(options.perPage)
			.skip(options.perPage * options.page)
			.exec(cb);
	},

	createFor: function (user, callback) {
		var Model = this;
		this.findOne({ user: user._id }, function (err, result) {
			if (err || result) {
				callback(err, result, false)
			} else {
				result = new Model({
					user: user._id,
					token: tokenizer.generate(8)
				});
				result.save(function (err) {
					callback(err, result, true);
				});
			}
		});
	}
};

var model;

if (mongo.models.Token) {
	model = mongo.model('Token');
} else {
	model = mongo.model('Token', schema);
}

module.exports = model;
