const express = require('express');
const todoRoutes = express.Router();

const todoController = require('../controller/todo-controller');
//const authHelpers = require('../services/auth/auth-helpers');


todoRoutes.get('/', todoController.index);

todoRoutes.get('/:id',todoController.show);

todoRoutes.post('/', todoController.create);

todoRoutes.get('/new',  (req, res) => {
  res.render('todo/todo-add');
});

todoRoutes.delete('/:id' , todoController.delete);

todoRoutes.put('/:id', todoController.update);
todoRoutes.get('/:id/edit' , todoController.edit);


module.exports = todoRoutes;
