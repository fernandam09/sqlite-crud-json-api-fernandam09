var db = require('./db')();
var model = null;
function initModel() {
  db.run("CREATE TABLE IF NOT EXISTS carreras(id INTEGER PRIMARY KEY AUTOINCREMENT, carrera TEXT, observacion TEXT, estado TEXT)");
  model = {};
  model.getAll = function (handler) {
    db.all("SELECT * from carreras;",
      function (err, rows) {
        if (err) {
          return handler(err, null);
        } else {
          console.log(rows);
          return handler(null, rows);
        }
      }
    )
  }

  model.getOne = function (id, handler) {
    db.get("SELECT * from carreras where id = ?;", [id],
      function (err, row) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, row || {});
        }
      }
    )
  }

  model.addOne = function (carrera, observacion, estado, handler) {
    db.run(
      "INSERT INTO carreras (carrera, observacion, estado) VALUES (?, ?, ?);",
      [carrera, observacion, estado],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  model.updateOne = function (id, carrera, observacion, estado, handler) {
    db.run(
      "UPDATE carreras set carrera = ?, observacion = ?, estado = ? where id = ?;",
      [carrera, observacion, estado, id],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  model.deleteOne = function (id, handler) {
    db.run(
      "DELETE from carreras where id = ?;",
      [id],
      function (err, rslt) {
        console.log(rslt);
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, true);
        }
      }
    );
  }

  return model;
}

module.exports = function () {
  if (!model) {
    return initModel();
  } else {
    return model;
  }
}
