{
	const mongoose = require('mongoose');
	const bcrypt = require('bcrypt');
	const SALT_WORK_FACTOR = 10;
	var Schema = mongoose.Schema;

	var UserSchema = new Schema({
		firstname: {
			type: String,
			minlength: 2,
			maxlength: 60,
		},

		lastname: {
			type: String,
			minlength: 2,
			maxlength: 60
		},

		email: {
			type: String,
			maxlength: 99,
			required: true,
			unique: true
		},

		dateofbirth: {
			type: Date,
			default: Date.now
		},

		password: {
			type: String,
			unique: true
		},

		role: {
			type: String,
			enum: ['admin', 'viewer']
		}
	});

	UserSchema.pre('save', function (next) {
		var user = this;

		if (!user.isModified('password')) return next();

		bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
			if (err) return next(err);

			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);

				user.password = hash;
				next();
			});
		});
	});

	UserSchema.methods.comparePassword = function (candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
			if (err) return cb(err);
			cb(null, isMatch);
		});
	};

	module.exports = mongoose.model('User', UserSchema);
}

