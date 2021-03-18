const savePostModel = require('../models/savePostModel');

// userId1 is following userId2
exports.savePost = (req, res, next) => {
	try {
		const data = {
			userId: req.userData._id,
			postId: req.params.postId,
		};
		savePostModel.savePost(data, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

exports.removePost = (req, res, next) => {
	try {
		const data = {
			userId: req.userData._id,
			postId: req.params.postId,
		};
		savePostModel.removePost(data, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};

// follower means the users which are following me i.e. I am userId2
exports.getAllSavedPost = (req, res, next) => {
	try {
		savePostModel.getAllSavedPost(req.userData._id, (err, reply) => {
			if (err) throw err;
			return res.json(reply);
		});
	} catch (error) {
		next(error);
	}
};