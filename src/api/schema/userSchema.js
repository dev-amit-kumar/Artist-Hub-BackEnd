const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: 'user',
	},
	themeColor: {
		type: Object,
		required: false,
		default: {
			main: '#032541',
			hover: '#088bf720',
			active: '#0d7ad3',
			text: '#ffffff',
		},
	},
	profilePic: {
		type: String,
		default: '',
	},
	profilePicId: {
		type: String,
		required: false,
	},
	isActive: {
		type: Number,
		default: 0,
	},
	coverPic: {
		type: String,
		required: false,
	},
	coverPicId: {
		type: String,
		required: false,
	},
	shortDesc: {
		type: String,
		required: false,
	},
	occassions: {
		type: Array,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('user', userSchema);
