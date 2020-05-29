var db = null;

function initDb(){
  var sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database("./carreras.sqlite3", (err) => {
    if (err) {
      console.log('Error al crear base de datos', err)
      process.exit(1);
    } else {
      console.log('Base de Datos creada!')
      /* Put code to create table(s) here */
    }
  });
  return db;
}

module.exports = function(){
  if (!db){
    return initDb();
  } else {
    return db;
  }
}
