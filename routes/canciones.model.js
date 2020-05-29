var db = require('./db')();
var model = null;
function initModel() {
  db.run("CREATE TABLE IF NOT EXISTS canciones(id INTEGER PRIMARY KEY AUTOINCREMENT, cancion TEXT, autor TEXT, album TEXT)");
  model = {};
  model.getAll = function (handler) {
    db.all("SELECT * from canciones;",
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
    db.get("SELECT * from canciones where id = ?;", [id],
      function (err, row) {
        if (err) {
          return handler(err, null);
        } else {
          return handler(null, row || {});
        }
      }
    )
  }

  model.addOne = function (cancion, autor, album, handler) {
    db.run(
      "INSERT INTO canciones (cancion, autor, album) VALUES (?, ?, ?);",
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

  model.updateOne = function (id, cancion, autor, album, handler) {
    db.run(
      "UPDATE canciones set cancion = ?, autor = ?, album = ? where id = ?;",
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
      "DELETE from canciones where id = ?;",
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
