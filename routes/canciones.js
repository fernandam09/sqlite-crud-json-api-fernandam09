var express= require('express');
var router = express.Router();
var model = require('./canciones.model')();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json(
    {
      "Instrucciones":"Crear el CRUD bajo el REST API usando JSON EndPoints",
      "Rutas": [  { "router_canciones_js": [
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

//CRUD --- CREATE(POST), READ(GET), UPDATE(PUT), DELETE
//        POST(CREAR O INSERTAR), GET(LEER O REALIZAR CONSULTAS), PUT(ACTUALIZAON), DELETE(BORRAR ELEMENTOS)

router.get("/songs", function(req, res){
model.getAll(function(err, songs){
    if(err){
        console.log(err);
        return res.status(500).json({"error":"Algo salio mal vuelva a intentar!"});
    } else{
        return res.status(200).json(songs);
    }
});// model.getAll

}); //get songs

router.get("/songs/:id", function(req, res){
var id = parseInt(req.params.id);
console.log(id);
model.getOne(id, function(err, row){
    if(err){
        console.log(err);
        return res.status(500).json({"error":"Algo salio mal vuelva a intentarlo"});
    } else{
        return res.status(200).json(row);
    }
});//model.getOne
//res.status(200).json({"id":id});

}); //get songs/:id

router.post("/songs", function(req, res){
    //ES6 DESTRUCCION DE OBJETOS
    var {cancion, autor, album} = req.body;
    model.addOne(cancion, autor, album, function(err, rslt){
       if(err){
         console.log({"Error":err});
         res.status(500).json({"msg":"Algo salio mal vuelva a intentarlo!"})
       } else{
         return res.status(200).json({"msg":"Registro Agregado!"});
       }
    });//model.addOne

});//post songs

router.put("/songs/:id", function(req, res){
var id = parseInt(req.params.id);
var {cancion, autor, album} = req.body;
model.updateOne(id, cancion, autor, album, (err, rslt)=>{
if(err){
    console.log(err);
    return res.status(500),json({"error":"Algo salio mal vuelve a intentarlo"});
} else{
    return res.status(500).json({"msg":"Registro Actualizado!"});
}
}); //Flecha gorda (err, rslt)=>{}

});//put songs/:id

router.delete("/songs/:id", function(req, res){
var id = parseInt(req.params.id);
model.deleteOne(id, (err, rslt)=>{
if(err){
    console.log(err);
    return res.status(500).json({"error":"Algo salio mal vuelva a intentarlo!"});
} else{
    return res.status(500).json({"msg":"Registro Eliminado!"});
}
});//Flecha gorda (err, rslt)=>{}

});//delete songs/:id

// ruta para postman
// http://localhost:3000/hw/songs


module.exports = router;
