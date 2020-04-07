module.exports = app => {
    const todo = require("./controller");

    // Create a new todo
    app.post("/todo", todo.create);

    // Retrieve all todo
    app.get("/todo", todo.findAll);

    // Retrieve a single todo with todoId
    app.get("/todo/:todoId", todo.findOne);

    // Update a todo with todoId
    app.put("/todo/:todoId", todo.update);

    // Delete a todo with todoId
    app.delete("/todo/:todoId", todo.delete);

    // Create a new todo
    app.delete("/todo", todo.deleteAll);
};
