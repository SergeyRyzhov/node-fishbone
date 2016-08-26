var mongodb = require('../tools/mongodb.js');
var crypto = require('crypto');

var Schema = mongodb.schema;
var mongo = mongodb.mongo;

var schema = new Schema({
	email: { type: String, default: '' },
	username: { type: String, default: '' },
	phone: { type: String, default: '' },

	hashed_password: { type: String, default: '' },
	salt: { type: String, default: '' }
});

schema
	.virtual('password')
	.set(function (password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () { return this._password; });

var validatePresenceOf = function (value) {
	return value && value.length;
};

schema.path('email').validate(function (email) {
	return email.length;
}, 'Email cannot be blank');

schema.path('email').validate(function (email, fn) {
	var User = mongo.model('User');

	if (this.isNew || this.isModified('email')) {
		User.find({ email: email }).exec(function (err, users) {
			fn(!err && users.length === 0);
		});
	} else fn(true);
}, 'Email already exists');

schema.path('username').validate(function (username, fn) {
	var User = mongo.model('User');

	if (this.isNew || this.isModified('username')) {
		User.find({ username: username }).exec(function (err, users) {
			fn(!err && users.length === 0);
		});
	} else fn(true);
}, 'User name already exists');

schema.path('username').validate(function (username) {
	return username.length;
}, 'Username cannot be blank');

schema.path('phone').validate(function (phone, fn) {
	var User = mongo.model('User');

	if (this.isNew || this.isModified('phone')) {
		User.find({ phone: phone }).exec(function (err, users) {
			fn(!err && users.length === 0);
		});
	} else fn(true);
}, 'Phone already exists');

schema.path('phone').validate(function (phone) {
	return phone.length;
}, 'Phone cannot be blank');

schema.path('hashed_password').validate(function (hashed_password) {
	return hashed_password.length && this._password.length;
}, 'Password cannot be blank');

schema.pre('save', function (next) {
	if (!this.isNew) return next();

	if (!validatePresenceOf(this.password) && !this.skipValidation()) {
		next(new Error('Invalid password'));
	} else {
		next();
	}
});

schema.methods = {
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},
	makeSalt: function () {
		return Math.round((new Date().valueOf() * Math.random())) + '';
	},
	encryptPassword: function (password) {
		if (!password) return '';
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex');
		} catch (err) {
			return '';
		}
	}
};

schema.statics = {
	load: function (options, cb) {
		options.select = options.select || '_id email username';
		this.findOne(options.criteria)
			.select(options.select)
			.exec(cb);
	}
};

var model;

if (mongo.models.User) {
	model = mongo.model('User');
} else {
	model = mongo.model('User', schema);
}

module.exports = model;