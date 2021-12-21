const User = require('../models/user');
const { errorHandler } = require('../utils');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) return res.status(404).json({
      error: 'User not found'
    });
    req.profile = user;
    next();
  })
}

exports.read = (req, res) => {
  req.profile.password = undefined;
  return res.send(req.profile);
}

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).json({ err: errorHandler(err) });
      data.password = undefined;
      res.json({
        message: 'Updated!',
        data,
      });
    });
}