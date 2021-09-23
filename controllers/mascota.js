// importamos el modelo de mascota
//const Mascota = require('../models/Mascota') YA NO SE OCUPA

//SESION 6 CONSTANTE
const mongoose = require('mongoose');
const Mascota = mongoose.model('Mascota');

function crearMascota(req, res, next) {
    // Instanciaremos una nueva mascota utilizando la clase usuario
    //var mascota = new Mascota(req.body)
    //res.status(201).send(mascota)

    //SESION 6
    const mascota = new Mascota(req.body);
    //save guarda en la bd, then es cuando todo salió bien
    mascota.save().then(mas => {
        res.status(200).send(mas) //Devuelve 200 y el nuevo registro
    }).catch(next); //Mongoose en encarga del error y que siga la ejecución del programa
}

function obtenerMascotas(req, res, next) { //Todas las mascotas o una en específico
    if (req.params.id) {//Si solo pasan el ID
        Mascota.findById(req.params.id)
            .then(unaMas => { res.send(unaMas) })
            .catch(next)
    } else { //Se pide toda la lista de mascotas
        Mascota.find()
            .then(todasMas => { res.send(todasMas) })
            .catch(next)
    }
}

function modificarMascota(req, res, next) {
    Mascota.findById(req.params.id)
        .then(mas => {
            if (!mas) {//Si no existe la mascota
                return res.sendStatus(401);//Solicitud mal hecha
            }
            let nuevaInfo = req.body;//Obtengo la info enviada
            if (typeof nuevaInfo.nombre !== "undefined")
                mas.nombre = nuevaInfo.nombre;
            if (typeof nuevaInfo.categoria !== "undefined")
                mas.categoria = nuevaInfo.categoria;
            if (typeof nuevaInfo.fotos !== "undefined")
                mas.fotos = nuevaInfo.fotos;
            if (typeof nuevaInfo.descripcion !== "undefined")
                mas.descripcion = nuevaInfo.descripcion;
            if (typeof nuevaInfo.anunciante !== "undefined")
                mas.anunciante = nuevaInfo.anunciante;
            if (typeof nuevaInfo.ubicacion !== "undefined")
                mas.ubicacion = nuevaInfo.ubicacion;
            
            mas.save()
            .then(actualizada => {res.status(200).json(actualizada.publicData())})
            .catch(next)
        })
        .catch(next)
}

function eliminarMascota(req, res, next) {
    Mascota.findOneAndDelete({_id:req.params.id})
    .then(r => {res.status(200).send("La mascota se eliminó.")})
    .catch(next)
}

function count(req, res, next){
    let categoria = req.params.cat;
    Mascota.aggregate([
        {'$match': {'categoria': categoria}},
        {'$count': 'total' }
    ])
    .then(r=>{ res.status(200).send(r)})
    .catch(next)
}

// exportamos las funciones definidas
module.exports = {
    crearMascota,
    obtenerMascotas,
    modificarMascota,
    eliminarMascota,
    count
}