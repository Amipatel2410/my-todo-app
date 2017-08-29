const db = require('../db/config');

const Todo = {};

Todo.findAll = () => {
  return db.query('SELECT * FROM todo');
};

Todo.findById = (id) => {
  return db.one(
   `SELECT
      *
    FROM
      todo
    WHERE
      id = $1`,
    [id]
  );
};

Todo.create = (todo) => {
  return db.one(
   `INSERT INTO
      todo
      (title, category, description, status)
    VALUES
      ($1, $2, $3, $4)
    RETURNING
      *`,
    [todo.title, todo.category, todo.description, todo.status]
  );
};
Todo.destroy = (id) => {
  return db.none(
   `DELETE FROM
      todo
    WHERE
      id = $1`,
    [id]
  );
};

Todo.update = (todo, id) => {
  return db.one(
   `UPDATE
      todo
    SET
      title = $1,
      category = $2,
      description = $3,
      status = $4
    WHERE
      id = $5
    RETURNING
      *`,
    [todo.title, todo.category, todo.description, todo.status, id]);
};

module.exports = Todo;














