const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');

const userAuthModel = require('../models/userAuthModel');

exports.registerUser = (req, res, next) => {
	try {
		const data = {
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		};

		userAuthModel.registerUser(data, (err, response) => {
			if (err) throw err;
			return res.json(response);
		});
	} catch (err) {
		next(err);
	}
};

exports.loginUser = (req, res, next) => {
	try {
		userAuthModel.loginUser(req.body.email, (err, userData) => {
			if (err) throw err;
			if (!userData) {
				return res.json({
					status: 300,
					message: 'Login Failed',
					error: 'User email doesnot exist',
				});
			}
			const checkPassword = bcrypt.compareSync(
				req.body.password,
				userData.password,
			);
			if (!checkPassword)
				return res.json({
					message: 'Invalid password',
					status: 300,
				});
			var token = jwt.sign({ id: userData._id }, secret, {
				expiresIn: 86400,
			});
			return res.header('auth-token', token).json({
				message: 'Login successfull',
				status: 200,
				email: userData.email,
				name: userData.name,
				token: token,
			});
		});
	} catch (err) {
		next(err);
	}
};