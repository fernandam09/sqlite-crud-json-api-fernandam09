var express = require('express');
var router = express.Router();
var model = require('./carreras.model')();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json(
    {
      "Instrucciones":"Crear el CRUD bajo el REST API usando JSON EndPoints",
      "Rutas": [ {"router_carreras_js": [
        { "Ruta": "/carreras", "Metodo": "Get", "Parametros": [], "Body": [] },
        { "Ruta": "/carreras/:id", "Metodo": "Get", "Parametros": ["id"], "Body": [] },
        { "Ruta": "/carreras", "Metodo": "Post", "Parametros": [], "Body": ["carrera","observacion","estado"] },
        { "Ruta": "/carreras/:id", "Metodo": "Put", "Parametros": ["id"], "Body": ["carrera", "observacion", "estado"] },
        { "Ruta": "/carreras/:id", "Metodo": "Delete", "Parametros": ["id"], "Body": [] }
      ]
      }, {
          "router_canciones_js": [
            { "Ruta": "/songs", "Metodo": "Get", "Parametros": [], "Body": [] },
            { "Ruta": "/songs/:id", "Metodo": "Get", "Parametros": ["id"], "Body": [] },
            { "Ruta": "/songs", "Metodo": "Post", "Parametros": [], "Body": ["cancion", "autor", "album"] },
            { "Ruta": "/songs/:id", "Metodo": "Put", "Parametros": ["id"], "Body": ["cancion", "autor", "album"] },
            { "Ruta": "/songs/:id", "Metodo": "Delete", "Parametros": ["id"], "Body": [] }
          ]
      }
      ]
    }
  );
});

//----Trabaja Aquí

// CRUD --> Create, Read, Update, Delete
//           POST, GET, PUT, DELETE
//----


router.get("/carreras", function(req, res){
  model.getAll(function(err, carreras){
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Algo Salió mal intente de nuevo."});
    } else {
      return res.status(200).json(carreras);
    }
  });
}); // get carreras

router.get("/carreras/:id", function(req, res){
  var id = parseInt(req.params.id);
  console.log(id);
  model.getOne(id, function(err, row){
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Algo salió mal, intente de nuevo."});
    } else {
      return res.status(200).json(row);
    }
  });
  //res.status(200).json({"id":id});
}); //get carreras/:id

router.post("/carreras", function(req, res){
  // ES6  destruccion de objetos
  var {carrera, observacion, estado} = req.body;
  model.addOne(carrera, observacion, estado, function(err, rslt){
    if(err){
      console.log({"Error":err});
      return res.status(500).json({"error":"Algo salio mal intente de nuevo"});
    } else {
      return res.status(200).json({"msg":"Registro Agregado Satisfactoriamente"});
    }
  });
});

router.put("/carreras/:id", function(req, res){
  var id = parseInt(req.params.id);
  var {carrera, observacion, estado} = req.body;
  model.updateOne(id, carrera, observacion, estado, (err, rslt)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Algo salio mal, intenta de  nuevo."});
    } else {
      return res.status(500).json({"msg":"Registro Actualizado Satisfactoriamente"});
    }
  });
}); //put carreras/:id

router.delete("/carreras/:id", function(req, res){
  var id = parseInt(req.params.id);
  model.deleteOne(id, (err, rslt)=>{
    if (err) {
      console.log(err);
      return res.status(500).json({ "error": "Algo salio mal, intenta de  nuevo." });
    } else {
      return res.status(500).json({ "msg": "Registro Eliminado Satisfactoriamente" });
    }
  });
}); // delete carreras/:id

module.exports = router;
