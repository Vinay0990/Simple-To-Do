const todo = require("./db-crud");

// Create and Save a new todo
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a todo
    const todoC = new todo({
        todo_title: req.body.todo_title,
        todo_desc: req.body.todo_desc,
        todo_date: req.body.todo_date
    });

    // Save todo in the database
    todo.create(todoC, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the todo."
            });
        else res.send(data);
    });
};

// Retrieve all todos from the database.
exports.findAll = (req, res) => {
    todo.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todos."
            });
        else res.send(data);
    });
};

// Find a single todo with a todoId
exports.findOne = (req, res) => {
    todo.findById(req.params.todoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found todo with id ${req.params.todoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving todo with id " + req.params.todoId
                });
            }
        } else res.send(data);
    });
};

// Update a todo identified by the todoId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    todo.updateById(
        req.params.todoId,
        new todo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found todo with id ${req.params.todoId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating todo with id " + req.params.todoId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a todo with the specified todoId in the request
exports.delete = (req, res) => {
    todo.remove(req.params.todoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found todo with id ${req.params.todoId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete todo with id " + req.params.todoId
          });
        }
      } else res.send({ message: `todo was deleted successfully!` });
    });
  };

// Delete all todos from the database.
exports.deleteAll = (req, res) => {
    todo.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all todos."
        });
      else res.send({ message: `All todos were deleted successfully!` });
    });
  };