const Todo = require('../models/todo');
const todoController = {};

todoController.index = (req, res) => {
  Todo.findAll()
    .then((todo) => {
      res.render('todo/todo-index', {
        todo: todo,
      });
    }).catch((err) => {
      console.log(err);
    });
};

todoController.show = (req, res) => {

  Todo.findById(req.params.id)
    .then((todo) => {
      res.render('todo/todo-show' , {
        todo: todo,
      });
    }).catch((err) => {
      console.log(err);
    });
};

todoController.create = (req , res) => {

  Todo.create({

    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    status: req.body.status,
  }).then((todo) => {
    res.redirect(`/todo/${todo.id}`)

  }).catch(err => {
    console.log(err);
  });
};

todoController.delete = (req, res) => {
  Todo.destroy(req.params.id)
    .then(() => {
      res.redirect('/todo');
    }).catch(err => {
      console.log(err);

    });
};
todoController.edit = (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      res.render('todo/todo-edit', {
        todo: todo,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

todoController.update = (req, res) => {
  Todo.update({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    status: req.body.status,
  }, req.params.id)
    .then(todo => {
      res.redirect(`/todo/${todo.id}`);
    }).catch(err => {
      console.log(err);

    });
};




module.exports = todoController;
