const sql = require("./db_init");

const todo = function(newtodo) {
    this.todo_title = newtodo.todo_title ;
    this.todo_desc = newtodo.todo_desc ;
    this.todo_date = newtodo.todo_date ;
    this.todo_status = false;
};

todo.create = (newtodo, result) => {
  sql.query("INSERT INTO todo_db SET ?", newtodo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created todo: ", { id: res.insertId, ...newtodo });
    result(null, { id: res.insertId, ...newtodo });
  });
};

todo.findById = (todoId, result) => {
  sql.query(`SELECT * FROM todo_db WHERE id = ${todoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found todo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found todo with the id
    result({ kind: "not_found" }, null);
  });
};

todo.getAll = result => {
  sql.query("SELECT * FROM todo_db", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todo_db: ", res);
    result(null, res);
  });
};

todo.updateById = (id, todo, result) => {
  sql.query(
    "UPDATE todo_db SET todo_title = ?, todo_desc = ?, todo_date = ? WHERE id = ?",
    [todo.todo_title, todo.todo_desc, todo.todo_date, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found todo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated todo: ", { id: id, ...todo });
      result(null, { id: id, ...todo });
    }
  );
};

todo.remove = (id, result) => {
  sql.query("DELETE FROM todo_db WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found todo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted todo with id: ", id);
    result(null, res);
  });
};

todo.removeAll = result => {
  sql.query("DELETE FROM todo_db", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} todo_db`);
    result(null, res);
  });
};

module.exports = todo;