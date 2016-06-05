var mongodb = require(__common + '/tools/mongodb.js');
var Schema = mongodb.schema;
var mongo = mongodb.mongo;

var schema = new Schema({
	externalId: { type: Number, required: true },
	firstName: { type: String, default: '' },
	lastName: { type: String, default: '' },
	username: { type: String, required: true },
	user: { type: Schema.ObjectId, ref: 'User', required: true }
});

schema.statics = {
	load: function (id, cb) {
		this.findOne({ _id: id })
			.exec(cb);
	},

	loadForOwnUser: function (user, cb) {
		this.find({ user: user._id })
			.exec(cb);
	},

	loadForExtUser: function (user, cb) {
		this.findOne({ externalId: user.id })
			.exec(cb);
	},

	list: function (options, cb) {
		var criteria = options.criteria || {};

		this.find(criteria)
			.limit(options.perPage)
			.skip(options.perPage * options.page)
			.exec(cb);
	},

	createFor: function (user, ownUser, callback) {
		var Model = this;
		this.findOne({ id: user.id }, function (err, result) {
			if (err || result) {
				callback(err, result, false);
			} else {
				result = new Model({
					externalId: user.id,
					firstName: user.first_name,
					lastName: user.last_name,
					username: user.username,
					user: ownUser._id
				});
				result.save(function (err) {
					callback(err, result, true);
				});
			}
		});
	}
};

var model;

if (mongo.models.TelegrmaUser) {
	model = mongo.model('TelegrmaUser');
} else {
	model = mongo.model('TelegrmaUser', schema);
}

module.exports = model;
