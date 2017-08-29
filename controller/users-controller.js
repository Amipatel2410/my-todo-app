const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/user');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}
usersController.index = (req, res) => {
  User.findUserTodo(req.user.id)
    .then(todo => {
        res.json({
        user: req.user,
        data: 'Put a user profile on this route',
        todo: todo,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({err: err});
    });
}
module.exports = usersController;
